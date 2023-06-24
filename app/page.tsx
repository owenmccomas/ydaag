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
import UserTitle from "@/components/title"
import CalenderWrapper from "@/components/calender-wrapper"
import PomodoroTimer from "@/components/pomodoro"

export default async function IndexPage() {

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <UserTitle />
      <div className="flex gap-4">
        <PomodoroTimer initialTime={1500} />
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
      <CalenderWrapper />
    </section>
  )
}
