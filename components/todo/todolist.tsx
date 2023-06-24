// TodoList.tsx
import { TableCaption, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import CreateTodo from "./create-todo";
import { currentUser } from "@clerk/nextjs";

const TodoList: React.FC = async () => {
  
  const user = await currentUser();

  const todos = await prisma.todo.findMany({
    where: {
      clerkId: user?.id,
    },
  })

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
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: parseInt(priority),
        clerkId: user!.id,
      },
    });
  }


  return (
    <div className="w-9/12 rounded-lg border px-1 pb-10 pt-1">
    <CreateTodo create={createTodo} />
    <Table>
      <TableCaption>A list of your todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>{todo.completed ? 'Completed' : 'Pending'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default TodoList;