import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import Notfound from './component/Notfound/Notfound';
import ProductDetils from './component/ProductDetils/ProductDetils';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [LoggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[LoggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/Shop">
              <Shop></Shop>
          </Route>
          <Route path="/Review">
              <Review></Review>
          </Route>
          <PrivateRoute path="/Inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
              <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
              <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
              <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
              <ProductDetils></ProductDetils>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
