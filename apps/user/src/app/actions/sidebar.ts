import { prisma } from "@async0/db";

export async function getSidebarData() {
  try {
    const lists = await prisma.list.findMany({
      select: {
        name: true,
        topic: {
          select: {
            name: true,
            topic_problem: {
              select: {
                problem: {
                  select: {
                    name: true,
                    difficulty: true,
                    time_limit: true,
                    memory_limit: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return lists;
  } catch (error) {
    console.log("ERROR FETCHING SIDEBAR DATA", error);
  } finally {
    await prisma.$disconnect();
  }
}
