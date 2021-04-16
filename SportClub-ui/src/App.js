import React/* , { useState, useEffect }*/ from "react";
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage"
import Register from "./components/Register"
import Dashboard from "./components/pages/DashboardPage"
import DashboardPage from "./components/pages/DashboardPage";
import ChangeRole from "./components/pages/ChangeRolePage";
//import Orders from "./components/Orders";

//import ordersService from "./services/orders";

/*function App() {
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
}*/

const App = () => (
    <div>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/dashboard" exact component={DashboardPage}/>
        <Route path="/appUsers/:id" render={(props) => <ChangeRole {...props} />} />
    </div>
);

export default App;
