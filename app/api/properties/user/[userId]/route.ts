import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

// api/properties/user/:userId
export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User id is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
