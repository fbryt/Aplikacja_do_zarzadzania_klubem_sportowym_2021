import axios from "axios";
const baseUrl = "http://localhost:8080/orders";

export const getAllOrders = async () => {
  const request = await axios.get(baseUrl);

  return request.data._embedded;
};

export default { getAllOrders };
