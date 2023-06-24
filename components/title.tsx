"use server"
import { currentUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import DigitalClock from './DigitalClock';
import dynamic from 'next/dynamic';

const DynamicDigitalClock = dynamic(() => import('../components/DigitalClock'), {
  ssr: false,
});



export default async function UserTitle() {

    const user = await currentUser();

    if ( user ) return (
        <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Good Morning {user?.firstName},
          <br className="hidden sm:inline" />
          This is your day at a glance.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {format(Date.now(), 'MMMM d, yyyy')}
        </p>
        <p className="max-w-[700px] text-md text-muted-foreground">
        <DynamicDigitalClock />
        </p>
        </div>
    )
    return (
        <p>Not Logged In</p>
    )
}