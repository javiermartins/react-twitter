import { map } from "lodash";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import configRouting from "./configRouting";

export default function Routing(props) {
  const { setCheckRefresh } = props;

  return (
    <Router>
      <Routes>
        {map(configRouting, (route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.page />}
            setCheckRefresh={setCheckRefresh}
          />
        ))}
      </Routes>
    </Router>
  );
}
