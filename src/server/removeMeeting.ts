"use server";

import { db } from "@/core/client/client";

export const RemoveMeeting = async (id: string) => {
  try {
    await db.schedule.delete({
      where: {
        id,
      },
    });
    return { success: "Meeting removed." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};
