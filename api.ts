import { PrismaClient } from '@prisma/client';


export const getTodos = async (userId:string) => {
    const prisma = new PrismaClient();
    // "use server"
    return await prisma.todo.findMany({
        where: {
            clerkId: userId,
        },
    })
}

export const createTodo = async ({
    title,
    description,
    priority,
    userId,
}: {
    title: string;
    description: string;
    priority: string;
    userId?: string;
}) => {
    const prisma = new PrismaClient();
    // "use server"
    if(userId) throw new Error('User not found')
    
    await prisma.todo.create({
        data: {
            title,
            description,
            priority: parseInt(priority),
            clerkId: userId
        },
    });
}

export const deleteTodo = async ( 
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



//  export const pickerColor = async (priority: string) => {
//     "use server"
//     switch (priority) {
//         case '1':
//             return 'bg-red-400';
//         case '2':
//             return 'bg-yellow-400';
//         case '3':
//             return 'bg-green-400';
//         default:
//             return 'bg-gray-400';
    // }

//   return newTodo;
// };