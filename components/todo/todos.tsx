import { currentUser } from '@clerk/nextjs';
import prisma from "@/lib/prisma";
import TodoList from "./todolist"

export default function Todos() {
  const createTodo = async (todo: string) => {
    const user = await currentUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user!.id,
      },
    });

    if (!dbUser) {
      await prisma.user.create({
        data: {
          clerkId: user!.id,
        },
      });
    }

    await prisma.todo.create({
      data: {
        title: todo,
        user: {
          connect: {
            clerkId: user!.id,
          },
        },
      },
    });
  };

  return (
    <div>
      <TodoList todos={[]} />
      <button onClick={() => createTodo('test')}>Create Todo</button>
    </div>
  );
}