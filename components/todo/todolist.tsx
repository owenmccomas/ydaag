import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getTodos } from "@/api"
import {  createTodo, deleteTodo } from "api"
import { currentUser } from "@clerk/nextjs"

import prisma from "@/lib/prisma"

import CreateTodo from "./create-todo"
import Todo from "./todos"
import { PrismaClient } from "@prisma/client"

const TodoList: React.FC = async () => {
  const user = await currentUser()

  const deleteTodo = async ( 
    { id, userId }:
    { userId:string, id: number}) => {
        // "use server"
        const prisma = new PrismaClient();
        const exists = await prisma.todo.findFirst({
      where: {
        id,
        clerkId: userId,
      },
    });
    if(!exists) console.error('Todo not found')
    await prisma.todo.delete({
      where: { id },
    });
  }

  // const [todos, setTodos] = useState([])

  // const router = useRouter();
  // useEffect(() => {
  //   const todoList:any = getTodos(user?.id!)
  //   setTodos(todoList)
  // }, [])

  return (
    <div className="w-9/12 rounded-lg border px-1 pb-10 pt-1">
      <CreateTodo userId={user?.id} />
      <Todo
       deleteTodo={deleteTodo} 
       />
    </div>
  )
}

export default TodoList
