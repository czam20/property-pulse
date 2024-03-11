export type PropertyType = {
  owner: string;
  name: string;
  type: string;
  description?: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: number | string;
  baths: number | string;
  square_feet: number | string;
  amenities: Array<string>;
  rates: {
    nightly?: number | string;
    weekly?: number | string;
    monthly?: number | string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images?: Array<string>;
};

export type PropertyProps = PropertyType & {
  _id: string;
  isFeatured: boolean;
};

export type PropertyCardProps = Omit<
  PropertyProps,
  "seller_info" | "amenities"
>;
