"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CalendarIcon, Trash2 } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RemoveMeeting } from "@/server/removeMeeting";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Schedule } from "@/resource/types/types";

export default function MeetingList({
  data,
  user,
}: {
  data: Schedule[];
  user: User;
}) {
  const router = useRouter();
  const removeMeeting = async (id: string) => {
    const response = await RemoveMeeting(id);
    if (response.success) {
      toast.success(response.success);
      router.refresh();
    } else {
      toast.error(response.error);
    }
  };
  console.log();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
        <CardDescription>
          View and manage your upcoming meetings.
        </CardDescription>
      </CardHeader>
      {data?.length === 0 && (
        <CardContent className="p-2">
          <p className="text-center text-xl text-primary">
            No upcoming meetings found. 🙁
          </p>
        </CardContent>
      )}
      <CardContent className="p-2 overflow-y-auto">
        <div className="grid gap-2 pb-20 capitalize ">
          {data?.map((meeting) => (
            <Card key={meeting?.id} className="bg-secondary relative">
              {/* {
                user?.role
              } */}
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => removeMeeting(meeting?.id)}
                className="absolute top-1 right-2 rounded-full"
              >
                <Trash2 className="h-5 w-5 stroke-primary hover:stroke-red-500" />
              </Button>
              <CardHeader className="p-2">
                <CardTitle className="flex flex-row items-start gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {meeting?.subject}
                </CardTitle>
                <CardDescription className="w-full flex flex-col items-start justify-center gap-1">
                  <p className="text-sm text-primary">
                    Message:{" "}
                    <span className="text-muted-foreground">
                      {meeting?.body}
                    </span>{" "}
                  </p>
                  <p className="text-sm text-primary">
                    Timing:{" "}
                    <span className="text-muted-foreground">{` ${meeting?.time} • ${meeting?.date}`}</span>{" "}
                  </p>
                  <p className="text-sm text-primary">
                    To:{" "}
                    <span className="text-muted-foreground">{`${
                      meeting?.memberId === user?.email
                        ? "ME"
                        : meeting?.memberId
                    }`}</span>{" "}
                  </p>
                  <p className="text-sm text-primary">
                    From:{" "}
                    <span className="text-muted-foreground">
                      {`From: ${
                        meeting?.userId === user?.id
                          ? "ME"
                          : meeting?.User?.email
                      }`}
                    </span>{" "}
                  </p>
                  <p className="text-sm text-primary">
                    Meeting Link:{" "}
                    <Link
                      href={meeting?.meetingLink}
                      target="_blank"
                      className="text-blue-400 cursor-pointer lowercase"
                    >
                      {meeting?.meetingLink}
                    </Link>
                  </p>
                </CardDescription>{" "}
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
