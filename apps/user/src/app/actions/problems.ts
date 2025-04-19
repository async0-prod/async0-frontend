"use server";

import { prisma } from "@async0/db";

export async function getProblemDetails(problemName: string) {
  // const session = await auth();
  // const token = session?.accessToken;

  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/user/problem/${name}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //       },
  //       cache: "no-store",
  //     }
  //   );

  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch problems: ${res.status}`);
  //   }

  //   const data = await res.json();
  //   return data;
  // } catch (err) {
  //   console.error("Error fetching problems:", err);
  //   return [];
  // }

  const problem = await prisma.problem.findFirst({
    where: { name: problemName },
    select: {
      id: true,
      name: true,
      difficulty: true,
      link: true,
      starter_code: true,
      testcase: { select: { id: true, input: true, output: true } },
      solution: { select: { id: true, code: true, rank: true } },
      submission: {
        select: {
          id: true,
          status: true,
          passed_testcases: true,
          total_testcases: true,
        },
      },
    },
  });
  return problem;
}
