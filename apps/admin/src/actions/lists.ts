"use server";

import { prisma } from "@async0/db";
import { cache } from "react";

export const getAllLists = cache(async () => {
  try {
    return await prisma.list.findMany();
  } catch (error) {
    console.log("ERROR FETCHING ALL LISTS", error);
  } finally {
    await prisma.$disconnect();
  }
});
