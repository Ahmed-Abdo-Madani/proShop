import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductsListScreen from "./Screens/ProductsListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrdersListScreen from "./Screens/OrdersListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/orders/:id" component={OrderScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />

          <Route
            exact
            path="/admin/productslist"
            component={ProductsListScreen}
          />
          <Route
            exact
            path="/admin/productslist/:pageNumber"
            component={ProductsListScreen}
          />
          <Route exact path="/admin/orderslist" component={OrdersListScreen} />
          <Route
            exact
            path="/admin/products/:id/edit"
            component={ProductEditScreen}
          />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route exact path="/search/:keyword" component={HomeScreen} />
          <Route exact path="/page/:pageNumber" component={HomeScreen} />
          <Route exact path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
