import React from "react";

const Orders = ({ orders }) => {
  if (!orders) return null;

  return (
    <div>
      <center>
        <h1>Order List: </h1>
      </center>

      {orders.map((order) => (
        <div key={order.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{order.description}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{order.status}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
