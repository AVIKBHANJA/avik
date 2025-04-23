import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, designation, testimonial } = body;

    // You can implement email notification logic here
    // For example, using a service like SendGrid, Mailgun, or EmailJS

    // For now, we'll just log and return a success response
    console.log("New testimonial received:", { name, designation, testimonial });

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send notification" },
      { status: 500 }
    );
  }
}
