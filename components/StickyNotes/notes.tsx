"use client"

import { useState, useEffect } from "react";
import { Note } from "./note";
import { Button } from "../ui/button";

export const Notes = ({
    notes,
    getNotes,
    updateNote,
    newNote,
}: {
    notes: any;
    getNotes: any;
    updateNote: any;
    newNote: any;
}) => {
    const [clientNotes, setClientNotes] = useState<any>(null)

    useEffect(() => {
        setClientNotes(getNotes())
    }, [])

    if(notes) return (
        <div>
            <div>
            <Button className="" variant='outline' onClick={newNote}>+</Button>
            <Button className="" variant='outline' onClick={()=>{}}>Save</Button>
            </div>
            {
                notes.map((note: any) => (
                    <Note />
                ))
            }
        </div>
    )
    else return (
        <div>
            <Button className="" variant='outline' onClick={newNote}>+</Button>
        </div>
    )
}