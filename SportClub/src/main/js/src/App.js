import React, { useState, useEffect } from "react";
import Orders from "./components/Orders";

import ordersService from "./services/orders";

function App() {
  const [orders, setOrders] = useState([]);

  const mockOrders = {
    orderList: [{ id: -1, description: "Mock", status: "Mocked" }],
  };

  useEffect(() => {
    ordersService
      .getAllOrders()
      .then((orders) => setOrders(orders.orderList))
      .catch((err) => setOrders(mockOrders.orderList));
  }, []);

  return <Orders orders={orders} />;
}

export default App;
