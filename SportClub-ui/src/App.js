import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useParams} from "react-router-dom";
import Register from "./components/Register";

function App() {
    return (
        <Router>
            <div>
          <h1>Strona</h1>
                  <Switch>
                    <Route exact path="/register">
                      <Register/>
                    </Route>
                      <Route exact path="/">
                          <h1>
                              Glowna
                          </h1>
                      </Route>
                  </Switch>
          </div>
        </Router>
    );
}

export default App;
