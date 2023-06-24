import Link from "next/link"
import { currentUser } from "@clerk/nextjs"
import { SheetIcon } from "lucide-react"
import { Button } from "react-day-picker"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

function openSheet() {
  console.log("open sheet")
}

export async function SiteHeader() {
  const user = await currentUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <Sheet>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({ variant: "outline" })}
                >
                  Open
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SheetTrigger>Profile</SheetTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </nav>
          </div>
          <SheetContent className="flex flex-col justify-between">
            <SheetHeader className="mt-10">
              <img
                width={120}
                className="mx-auto rounded-full"
                src={user?.imageUrl}
              />
              <SheetTitle className="text-center">
                {user?.firstName} {user?.lastName}
              </SheetTitle>
            </SheetHeader>
            <SheetDescription className="align-bottom">
              We think you're pretty cool. Here some stuff about you
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
