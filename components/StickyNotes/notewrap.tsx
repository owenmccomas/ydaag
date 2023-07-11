import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs";
import { Notes } from "./notes";


export const NoteWrap = async () => {

    const user = await currentUser();

    const getNotes = async () => {
        "use server"
        await prisma.notes.findMany({
            where: {
                clerkId: user?.id,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    const newNote = async () => {
        "use server"
        await prisma.notes.create({
            data: {
                clerkId: user?.id,
            }
        })
    }

    const updateNote = async (id: number, note: string) => {
        "use server"
        const exists = await prisma.notes.findFirst({
            where: {
                id,
                clerkId: user?.id,
            },
        });
        if (!exists) console.error('Note not found')
        await prisma.notes.update({
            where: { id },
            data: {
                note,
            }
        });
    }

    let notes

    return (
        <div className="flex h-96 w-3/12 items-center justify-center rounded-lg border p-10">
            <Notes newNote={newNote} updateNote={updateNote} notes={notes} getNotes={getNotes} />
        </div>
    )
}