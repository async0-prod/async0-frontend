import { WebsocketMessage } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

class Publisher {
  private static instance: Publisher | null = null;
  private ws: WebSocket | null = null;
  private url: string;
  private isConnected: boolean = false;
  private publisherId: string;

  private constructor(url: string, publisherId?: string) {
    this.url = url;
    this.publisherId = publisherId ?? uuidv4();
    this.connect();
  }

  public static getInstance(url: string, publisherId?: string) {
    if (!Publisher.instance) {
      Publisher.instance = new Publisher(url, publisherId);
    }
    return Publisher.instance;
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.isConnected = true;
      console.log("Publisher connected to", this.url);

      this.ws?.send(
        JSON.stringify({
          type: "Register",
          user_id: this.publisherId,
        })
      );
    };

    this.ws.onclose = () => {
      this.isConnected = false;
      console.log("Publisher disconnected");

      // will this message be sent if socket is closed?
      this.ws?.send?.(
        JSON.stringify({
          type: "Deregister",
          user_id: this.publisherId,
        })
      );
    };

    this.ws.onerror = (err) => {
      console.error("WebSocket error:", err);

      this.ws?.send?.(
        JSON.stringify({
          type: "Deregister",
          user_id: this.publisherId,
        })
      );
    };

    this.ws.onmessage = (event) => {
      const data: WebsocketMessage = JSON.parse(event.data);
      console.log("Message from server:", data);
    };
  }

  public publish(data: any) {
    if (this.isConnected && this.ws) {
      this.ws.send(
        JSON.stringify({
          type: "Message",
          publisher_id: this.publisherId,
          data,
        })
      );
    } else {
      console.warn("Publisher not connected, message not sent:", data);
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.send?.(
        JSON.stringify({
          type: "Deregister",
          user_id: this.publisherId,
        })
      );
      this.ws.close();
      Publisher.instance = null; // reset singleton
    }
  }

  public getPublisherId() {
    return this.publisherId;
  }
}

export default Publisher;
