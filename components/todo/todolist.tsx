// TodoList.tsx
import { TableCaption, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import prisma from "@/lib/prisma";
import CreateTodo from "./create-todo";
import { currentUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";

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

  const pickerColor = (priority: string) => {
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
    <Table>
      <TableCaption>A list of your todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Priority</TableHead>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell >
              <div className={`h-[20px] w-[20px] rounded-full bg-opacity-40 ${pickerColor(todo.priority ? todo.priority.toString() : '')}`} />
            </TableCell>
            <TableCell className="w-[200px]">{todo.title}</TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>
              {!todo.completed ? (
                <span className="text-green-500">OPEN</span>
              ):(
                <span className="text-red-500">CLOSED</span>
              )}
            </TableCell>
            <TableCell>
              <Trash2 className="cursor-pointer opacity-50 transition-all hover:opacity-60" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default TodoList;