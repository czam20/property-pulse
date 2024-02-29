import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/db";
import Property from "@/models/Property";

// api/properties
export const GET = async (request: NextApiRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 });
  }
};
