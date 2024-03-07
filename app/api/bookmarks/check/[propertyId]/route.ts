import { NextRequest } from "next/server";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    connectDB();

    const propertyId = params.propertyId;

    if (!propertyId) {
      return new Response("Property id is required", { status: 400 });
    }

    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    //find user in db
    const user = await User.findOne({ _id: session.userId });

    //check is property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
