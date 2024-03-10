export type Message = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  recipient: string;
  property: {
    name: string;
    _id: string;
  };
  sender: {
    username: string;
    _id: string;
  };
  createdAt: string;
};
