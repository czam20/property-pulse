import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

//POST /api/messages
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to send a message" }),
        {
          status: 401,
        }
      );
    }

    const { name, email, phone, message, recipient, property } =
      await request.json();

    //
    if (session.userId === recipient) {
      return new Response(
        JSON.stringify({ message: "Can not send a message to yourself" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      sender: session?.userId,
      recipient,
      name,
      email,
      phone,
      body: message,
      property,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
