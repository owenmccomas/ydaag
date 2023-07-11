import prisma from "@/lib/prisma";
import CreateTodo from "./create-todo";
import { currentUser } from "@clerk/nextjs";
import Todo from "./todos";

const TodoList: React.FC = async () => {
  
  const user = await currentUser();

  const getTodos = async () => {
    "use server"
    return await prisma.todo.findMany({
    where: {
      clerkId: user?.id,
    },
  })
}

const todos = await getTodos()

  const createTodo = async ({
    title,
    description,
    priority,
  }: {
    title: string;
    description: string;
    priority: string;
  }) => {
    "use server"
    if(!user?.id) throw new Error('User not found')

    await prisma.todo.create({
      data: {
        title,
        description,
        priority: parseInt(priority),
        clerkId: user!.id,
      },
    });
  }

  const deleteTodo = async (id: number) => {
    "use server"
    const exists = await prisma.todo.findFirst({
      where: {
        id,
        clerkId: user?.id,
      },
    });
    if(!exists) console.error('Todo not found')
    await prisma.todo.delete({
      where: { id },
    });
  }



  const pickerColor = async (priority: string) => {
    "use server"
    switch (priority) {
        case '1':
            return 'bg-red-400';
        case '2':
            return 'bg-yellow-400';
        case '3':
            return 'bg-green-400';
        default:
            return 'bg-gray-400';
    }
}

  return (
    <div className="w-9/12 rounded-lg border px-1 pb-10 pt-1">
    <CreateTodo create={createTodo} />
    <Todo todos={todos} pickerColor={pickerColor} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoList;