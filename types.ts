export type PropertyCardProps = {
  _id: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds?: number;
  baths?: number;
  square_feet?: number;
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  images: Array<string>;
};

export type PropertyProps = {
  _id: string;
  name: string;
  type: string;
  description?: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: Array<string>,
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string,
    email: string,
    phone: string
  },
  images: Array<string>;
  isFeatured: boolean;
};
