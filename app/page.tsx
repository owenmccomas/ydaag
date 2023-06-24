"use client"

import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function IndexPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Good Morning (Name)
          <br className="hidden sm:inline" />
          This is your day at a glance.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          June 23rd, 2023
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          // href={siteConfig.links.docs}
          href={"https://pomofocus.io/"}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Pomodoro
        </Link>
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

      <div className="flex gap-4">
        <Table>
          <TableCaption>
            A list of your recent invoices. (dummy data)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Wire Transfer</TableCell>
              <TableCell className="text-right">$9,200.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV003</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$300.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </section>
  )
}
