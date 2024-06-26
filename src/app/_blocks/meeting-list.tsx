import { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CalendarIcon, Trash2 } from "lucide-react";
// import { Schedule } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Schedule {
  id: string;
  date: string | '';
  time: string | '';
  meetingLink: string | '';
  memberId: string | '';
  subject: string | '';
  body: string | '';
  createdAt: Date;
  updatedAt: Date;
  userId: string | '';
  User: User | null;
}

export default function MeetingList({ data, user }: { data: Schedule[], user: User }) {

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
        <CardDescription>
          View and manage your upcoming meetings.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[450px] p-2 overflow-y-auto border-2">
        <div className="grid gap-2 pb-20 capitalize ">
          {data?.map((meeting) => (
            <Card key={meeting?.id} className="bg-secondary relative">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute top-2 right-2 rounded-full"
              >
                <Trash2 className="h-5 w-5 stroke-primary hover:stroke-red-500" />
              </Button>
              <CardHeader>
                <CardTitle className="flex flex-row items-start gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {meeting?.subject}
                </CardTitle>
                <p className="text-muted-foreground font-normal">{`Message: ${meeting?.body}`}</p>
                <CardDescription>
                  <span>{`Timing: ${meeting?.time} • ${meeting?.date}`}</span>
                  <br />
                  <span>{`To: ${meeting?.memberId === user?.email ? "ME" : meeting?.memberId}`}</span>
                  <br />
                  <span>{`From: ${meeting?.userId === user?.id ? "ME" : meeting?.User?.email}`}</span>
                  <br />
                  <span>
                    Meeting Link:{" "}
                    <Link
                      href={meeting?.meetingLink}
                      target="_blank"
                      className="text-blue-400 cursor-pointer lowercase"
                    >
                      {meeting?.meetingLink}
                    </Link>
                  </span>
                </CardDescription>{" "}
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
