import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { PropertyType } from "@/types/properties-types";

// api/properties/:id
export const GET = async (request: NextRequest, { params }: any) => {
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

// DELETE api/properties/:id
export const DELETE = async (request: NextRequest, { params }: any) => {
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

// PUT api/properties/:id
export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    await connectDB();
    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;
    //get property
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property doesn't exists", { status: 404 });
    }

    //verify ownership
    if (existingProperty.owner.toString() !== session.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //data
    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const propertyData: PropertyType = {
      owner: session.userId,
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipcode: formData.get("location.zipcode") as string,
      },
      beds: formData.get("beds") as string,
      baths: formData.get("baths") as string,
      square_feet: formData.get("square_feet") as string,
      amenities: amenities as string[],
      rates: {
        weekly: formData.get("rates.weekly") as string,
        monthly: formData.get("rates.monthly") as string,
        nightly: formData.get("rates.nightly") as string,
      },
      seller_info: {
        name: formData.get("seller_info.name") as string,
        email: formData.get("seller_info.email") as string,
        phone: formData.get("seller_info.phone") as string,
      },
    };

    //update property
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(
      JSON.stringify({
        updatedProperty,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
