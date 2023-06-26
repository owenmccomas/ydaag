"use client"
import { Trash2 } from "lucide-react";
import { TableCaption, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";


export default function Todo({ todos, deleteTodo, pickerColor
}: {
  todos: any | undefined;
  deleteTodo: any;
  pickerColor: any;
}) {


  return (
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
        {todos.map((todo: any) => (
          <TableRow key={todo.id}>
            <TableCell >
              <div className={`h-[20px] w-[20px] rounded-full bg-opacity-40 ${pickerColor(todo.priority ? todo.priority.toString() : '')}`} />
            </TableCell>
            <TableCell className="w-[200px]">{todo.title}</TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>
              {!todo.completed ? (
                <span className="ml-3 text-green-500">OPEN</span>
              ):(
                <span className="ml-3 text-red-500">CLOSED</span>
              )}
            </TableCell>
            <TableCell>
              <Trash2 onClick={()=>deleteTodo(todo.id)} className="mx-auto cursor-pointer opacity-50 transition-all hover:opacity-60" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}