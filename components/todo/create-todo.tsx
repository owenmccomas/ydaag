"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import CalenderWrapper from "@/components/calender-wrapper";
import { createTodo } from "@/api";
// import { currentUser} from "@clerk/nextjs";


type NewTodo = {
  title: string;
  description: string;
  priority: string;
  dueDate: Date | null;
};

export default async function CreateTodo(
  {userId}: {userId: string | undefined}
  ) {
    const [inputs, setInputs] = useState<NewTodo>({
    title: "",
    description: "",
    priority: "0",
    dueDate: null,
    
  });
  
  // const user = await currentUser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const pickerColor = (priority: string) => {
    switch (priority) {
      case "1":
        return "bg-red-400";
      case "2":
        return "bg-yellow-400";
      case "3":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const setDate = (date: Date | null) => {
    setInputs({
      ...inputs,
      dueDate: date,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({...inputs, userId});
    setInputs({
      title: "",
      description: "",
      priority: "0",
      dueDate: null,
    });
    setIsSheetOpen(false);
  };

  return (
    <div>
      <Sheet open={isSheetOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} onClick={() => setIsSheetOpen(true)}>Create Todo</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mt-10">
            <SheetTitle
              className="tracking-hughJanus text-center font-mono text-2xl uppercase"
              style={{ letterSpacing: ".5em" }}
            >
              New Todo
            </SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="mt-12 flex w-full flex-col gap-12">
            <Label>
              Title
              <Input
                value={inputs.title}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    title: e.target.value,
                  });
                }}
              />
            </Label>
            <Label>
              Description
              <Textarea
                value={inputs.description}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    description: e.target.value,
                  });
                }}
              />
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className={`${pickerColor(inputs.priority)} mx-auto w-6/12 bg-opacity-40 p-3`}>
                  Priority {inputs.priority}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none">
                <DropdownMenuItem
                  onClick={(e) => {
                    setInputs({
                      ...inputs,
                      priority: e.currentTarget.id,
                    });
                  }}
                  id={'1'} className="my-2 cursor-pointer bg-red-400 bg-opacity-40">
                  1 
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setInputs({
                      ...inputs,
                      priority: e.currentTarget.id,
                    });
                  }}
                  id='2' className="my-2 cursor-pointer bg-yellow-400 bg-opacity-40">
                  2
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setInputs({
                      ...inputs,
                      priority: e.currentTarget.id,
                    });
                  }}
                  id='3' className="my-2 cursor-pointer bg-green-400 bg-opacity-40">
                  3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Collapsible className="w-full">
              <CollapsibleTrigger asChild>
                <Button className="w-full" variant={'outline'}>Due Date</Button>    
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-10 w-full">
                <CalenderWrapper center/>
              </CollapsibleContent>
            </Collapsible>
            <Button type="submit" className="mx-auto w-6/12">Submit</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
