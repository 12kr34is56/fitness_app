"use server";

import { db } from "@/core/client/client";

// ******************************************************************
export async function fetchTrainers() {
  try {
    const response = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    // Filter the trainers based on role
    const trainerData = response?.filter(
      (user: { role: string }) => user.role === "TRAINER"
    );
    return trainerData;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return [];
  }
}

// *******************************************************************
export async function AllMembers() {
  try {
    const response = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        sex: true,
      },
      where: {
        role: {
          not: {
            equals: "ADMIN",
          },
        },
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return [];
  }
}

// ****************************************************************
export async function createMessage(values: {
  subject: string;
  text: string;
  to: string;
}) {
  try {
    const payload = {
      ...values,
    };

    const response = await fetch("/api/mess/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: { error?: string; success?: string; feedback?: string } =
      await response.json();

    return data;
  } catch (error: any) {
    console.error("Error creating message:", error);
    throw new Error(error.message);
  }
}
