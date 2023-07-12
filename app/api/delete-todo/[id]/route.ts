import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id // 'a', 'b', or 'c'


  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    // if (!todo) {
    //   return res.status(404).json({ message: "Todo not found" });
    // }

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

  //   return res.status(200).json({ message: "Todo deleted successfully" });
  // } catch (error) {
  //   console.error("Error deleting todo:", error);
  //   return res.status(500).json({ message: "Internal server error" });
  }
  catch(e) {
    console.log(e)
  } 
}
