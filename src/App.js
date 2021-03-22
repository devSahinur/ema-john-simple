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

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/Shop">
              <Shop></Shop>
          </Route>
          <Route path="/Review">
              <Review></Review>
          </Route>
          <Route path="/Inventory">
              <Inventory></Inventory>
          </Route>
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
    </div>
  );
}

export default App;
