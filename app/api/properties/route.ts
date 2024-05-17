import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/utils/getSessionUser';

//GET /api/properties
export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

//POST /api/properties
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter(image => image !== '');

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        nightly: formData.get('rates.nightly'),
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      images,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    // return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
  } catch (error) {
    return new Response('Failed to Add', { status: 500 });
  }
};
