import { SERVER_URL } from '../settings';

export const getProducts = async (url = '') => {
  const res = await fetch(`${SERVER_URL}/api/v1/beers?${url}`);
  return await res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${SERVER_URL}/api/v1/beers/${id}`);
  return await res.json();
};

export const createOrder = async (customerInfo, order, finalPrice) => {
  const { firstName, lastName, phone, shippingAddress } = customerInfo;
  const products = order.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
  const res = await fetch(`${SERVER_URL}/api/v1/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      finalPrice,
      firstName,
      lastName,
      phone,
      shippingAddress,
      products,
    }),
  });
  return await res.json();
};
