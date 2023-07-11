"use client"

import { Textarea } from "../ui/textarea"


export const Note = (note: any) => {

    return (
        <div className="flex h-96 w-3/12 items-center justify-center rounded-lg border p-10">
            <Textarea defaultValue={note.note} />
        </div>
    )
}