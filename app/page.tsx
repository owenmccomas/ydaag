import React from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import UserTitle from "@/components/title"
import CalenderWrapper from "@/components/calender-wrapper"
import PomodoroTimer from "@/components/pomodoro"
import TodoList from "@/components/todo/todolist"
import { NoteWrap } from "@/components/StickyNotes/notewrap"


export default async function IndexPage() {

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <UserTitle />
      <div className="flex gap-4">
        <PomodoroTimer initialTime={25} />

        <Button variant={"outline"} className="h-12">
          <Link
            target="_blank"
            rel="noreferrer"
            href={"https://github.com"}
            // href={siteConfig.links.github}
          >
            GitHub
          </Link>
        </Button>

        <Button variant={"outline"} className="h-12">
        <Link
          target="_blank"
          rel="noreferrer"
          href={"https://github.com"}
          // href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
      <div className="flex gap-3">
      <TodoList />
      <NoteWrap />
      </div>
      <div className="flex gap-3">
      <div className="flex w-3/12 items-center justify-center rounded-lg border p-10">
        <p className="underline">Another Component Here</p>
      </div>
      <CalenderWrapper />
      </div>
    </section>
  )
}
