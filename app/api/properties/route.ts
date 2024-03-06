import { NextRequest } from "next/server";
import connectDB from "@/config/db";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";
import Property from "@/models/Property";
import { PropertyType } from "@/types/properties-types";

// GET api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST api/properties
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image: any) => image?.name !== "");

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
      images: [],
    };

    //upload images tu cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imagaData = Buffer.from(imageArray);

      //convert image data to base6
      const imageBase64 = imagaData.toString("base64");

      //upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "propertypulse" }
      );

      imageUploadPromises.push(result.secure_url);

      //wait for all the images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      //add uploaded image to the data
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
    // return new Response(
    //   JSON.stringify({
    //     message: "Success",
    //   }),
    //   { status: 200 }
    // );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
