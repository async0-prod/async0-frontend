import { prisma } from "@async0/db";
import { cache } from "react";

export const getAllTopics = cache(async () => {
  try {
    return await prisma.topic.findMany();
  } catch (error) {
    console.log("ERROR FETCHING ALL TOPICS", error);
  } finally {
    await prisma.$disconnect();
  }
});
