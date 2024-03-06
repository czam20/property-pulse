import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

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

// api/properties/:id
export const DELETE = async (request: NextApiRequest, { params }: any) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property)
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });

    //verify ownership
    if (property.owner.toString() !== sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();
    return new Response("Property deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
