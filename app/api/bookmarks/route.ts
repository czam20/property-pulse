import { NextRequest } from "next/server";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    connectDB();
    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    //find user in db
    const user = await User.findOne({ _id: session.userId });

    //get user bookmarks
    const bookmarks = await Property.find({
      _id: {
        $in: user.bookmarks,
      },
    });

    return new Response(JSON.stringify({ bookmarks }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    connectDB();

    const { propertyId } = await request.json();
    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    //find user in db
    const user = await User.findOne({ _id: session.userId });

    //check is property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      //remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmarked removed successfully";
      isBookmarked = false;
    } else {
      //add it
      user.bookmarks.push(propertyId);
      message = "Bookmarked added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
