import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

//PUT /api/messages/:id
export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    await connectDB();

    const { id } = params;

    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to send a message" }),
        {
          status: 401,
        }
      );
    }

    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }

    //verify ownership
    if (message.recipient.toString() !== session.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    //update message to read/unread
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
