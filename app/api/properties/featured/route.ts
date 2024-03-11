import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET api/properties/featured
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({ is_featured: true }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
