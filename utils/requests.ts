const urlBase = process.env.NEXT_PUBLIC_API_DOMAIN;

export const getProperties = async () => {
  try {
    const response = await fetch(`${urlBase}/properties`);

    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProperty = async (id: string) => {
  try {
    const response = await fetch(`${urlBase}/properties/${id}`);
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
