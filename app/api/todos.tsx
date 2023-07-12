// api/todos.ts
"use server"

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { currentUser } from "@clerk/nextjs";

type NewTodo = {
  title: string;
  description: string;
  priority: string;
  dueDate: Date | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await currentUser();

  if (req.method === "POST") {
    const todo: NewTodo = req.body;

    try {
      if (!user?.id) {
        throw new Error("User not found");
      }

      const createdTodo = await prisma.todo.create({
        data: {
          title: todo.title,
          description: todo.description,
          priority: parseInt(todo.priority),
          clerkId: user.id,
        },
      });

      res.status(200).json({ message: "Todo created successfully", todo: createdTodo });
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      if (!user?.id) {
        throw new Error("User not found");
      }

      const todos = await prisma.todo.findMany({
        where: {
          clerkId: user.id,
        },
      });

      res.status(200).json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
