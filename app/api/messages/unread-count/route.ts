import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

//GET /api/messages
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }

    const unreadMessagesCount = await Message.countDocuments({
      recipient: session.userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessagesCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
