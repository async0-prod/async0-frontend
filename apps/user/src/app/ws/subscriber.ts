import { WebsocketMessage, WebsocketResponse } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

type MessageHandler = (msg: WebsocketMessage, publisherId: string) => void;

export class Subscriber {
  private static instance: Subscriber;
  private connections: Map<string, WebSocket> = new Map();
  private handlers: MessageHandler[] = [];
  private subscriberId: string;

  private constructor() {
    this.subscriberId = uuidv4();
  }

  public static getInstance() {
    if (!Subscriber.instance) {
      Subscriber.instance = new Subscriber();
    }
    return Subscriber.instance;
  }

  public subscribe(publisherId: string, url: string) {
    if (this.connections.has(publisherId)) return; // already subscribed

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log(`Connected to publisher ${publisherId}`);
      ws.send(
        JSON.stringify({
          type: "Subscribe",
          subscriber_id: this.subscriberId,
          publisher_id: publisherId,
        })
      );
    };

    ws.onmessage = (event) => {
      const data: WebsocketResponse | WebsocketMessage = JSON.parse(event.data);

      if (data.kind === "response") {
        if (data.success) {
          console.log("Success from server:", data.message);
        } else {
          console.error("Error from server:", data.message);
          ws.close();
          console.log("websocket closed");
          this.connections.delete(publisherId);
        }
      }

      if (data.kind === "message") {
        this.handlers.forEach((h) => h(data, publisherId));
      }
    };

    ws.onclose = () => {
      console.log(`Disconnected from publisher ${publisherId}`);
      this.connections.delete(publisherId);
    };

    ws.onerror = () => {
      console.error(`Error with publisher ${publisherId}`);
      ws.close();
      this.connections.delete(publisherId);
    };

    this.connections.set(publisherId, ws);
  }

  public unsubscribe(publisherId: string) {
    const ws = this.connections.get(publisherId);
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "Unsubscribe",
          subscriber_id: this.subscriberId,
          publisher_id: publisherId,
        })
      );
      ws.close();
      this.connections.delete(publisherId);
    }
  }

  public onMessage(handler: MessageHandler) {
    this.handlers.push(handler);
  }

  public disconnectAll() {
    this.connections.forEach((ws, publisherId) => {
      ws.send(
        JSON.stringify({
          type: "Unsubscribe",
          subscriber_id: this.subscriberId,
          publisher_id: publisherId,
        })
      );
      ws.close();
      console.log("websocket closed");
    });
    this.connections.clear();
  }
}
