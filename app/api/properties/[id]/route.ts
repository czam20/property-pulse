import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/db";
import Property from "@/models/Property";

// api/properties/:id
export const GET = async (request: NextApiRequest, { params }: any) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property)
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
