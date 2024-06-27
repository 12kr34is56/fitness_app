"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader, X } from "lucide-react";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Enter correct email address.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  sex: z.string().min(2, {
    message: "Sex must be at least 2 characters.",
  }),
  age: z.string().min(18, {
    message: "Age must be at least 18 years old.",
  }),
  weight: z.string().min(1, {
    message: "Weight must be at least 1.",
  }),
  height: z.string().min(1, {
    message: "Height must be at least 1.",
  }),
  goal: z.string().min(2, {
    message: "Goal must be at least 2 characters.",
  }),
  trainerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  studentsNames: z.array(z.string()),
});

function MembersDetailsForm({
  AlertDialogFooter,
  data,
}: {
  data: any;
  AlertDialogFooter: any;
}) {
  const [isPending, setIsPending] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      sex: "",
      age: "",
      weight: "",
      height: "",
      goal: "",
      role: "",
      trainerName: "",
      studentsNames: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      // 3. Send the data to your backend.
      setIsPending(false);
      toast.success(values.fullname);
    } catch (error) {
      setIsPending(false);
      toast.error("Something went wrong.");
    }
  }

  return (
    <Table>
      <AlertDialogFooter>
        <div className="w-full h-[90vh]">
          <ScrollArea className="w-full h-full p-4">
            <div className="w-full mb-10 flex items-center justify-between">
              <h2 className="text-xl font-bold">View & Change Details</h2>
              <AlertDialogCancel className="p-1">
                <Button variant={"ghost"} size={"icon"}>
                  <X className="h-5 w-5" />
                </Button>
              </AlertDialogCancel>
            </div>
            <div className="w-full flex items-center justify-center mb-5">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={data?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {data?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Name</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Name"
                          {...field}
                          value={field.value || data?.name}
                          // disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Email</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Email"
                          {...field}
                          value={field.value || data?.email}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Gender</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter gender"
                          {...field}
                          value={field.value || data?.sex}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Age</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Age"
                          {...field}
                          value={field.value || data?.age}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Weight</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Weight"
                          {...field}
                          value={field.value || data?.weight}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Height</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Height"
                          {...field}
                          value={field.value || data?.height}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Role</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Role"
                          {...field}
                          value={field.value || data?.role}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {data?.role === "USER" && (
                  <FormField
                    control={form.control}
                    name="trainerName"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                        <FormLabel className="w-full">
                          Current Trainer
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Enter Trainer Name"
                            {...field}
                            value={field.value || data?.trainerName}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {data?.role === "TRAINER" && (
                  <FormField
                    control={form.control}
                    name="studentsNames"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                        <FormLabel className="w-full">Students Names</FormLabel>
                        <FormControl className="w-full">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="w-full border rounded-xl text-sm px-4 py-2">
                              List of students
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {data?.studentsNames ? (
                                data?.studentsNames?.map(
                                  (
                                    {
                                      studentName,
                                      studentEmail,
                                    }: {
                                      studentName: string;
                                      studentEmail: string;
                                    },
                                    index: number
                                  ) => (
                                    <DropdownMenuItem
                                      key={index}
                                      className="w-full flex flex-col"
                                    >
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Name</TableHead>
                                          <TableHead>Email</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <Separator />
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>{studentName}</TableCell>
                                          <TableCell>{studentEmail}</TableCell>
                                        </TableRow>
                                      </TableBody>
                                      <DropdownMenuSeparator />
                                    </DropdownMenuItem>
                                  )
                                )
                              ) : (
                                <p className="text-sm px-3 py-2 text-center">
                                  No students yet
                                </p>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {data?.role === "USER" && (
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                        <FormLabel className="w-full">Goal</FormLabel>
                        <FormControl className="w-full">
                          <Textarea
                            placeholder="Enter Goal..."
                            {...field}
                            value={field.value || data?.goal}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="w-full grid grid-cols-3 gap-2 items-center justify-center">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full col-span-2"
                  >
                    {isPending && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                  <AlertDialogCancel className="col-span-1">
                    Close
                  </AlertDialogCancel>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </AlertDialogFooter>
    </Table>
  );
}

export default MembersDetailsForm;
