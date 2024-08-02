import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-routes";
import { Layout } from "./layout/admin-layout";
import { CustomerLayout } from "./layout/customer-layout";
import { Home } from "./components/Home";
import Orders from "./pages/Order";
import Products from "./pages/manage-product";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import { SignUpForm } from "./components/auth/sign-up";
import { LoginForm } from "./components/auth/login";
import ProductDetails from "./components/product-details";

const isAdmin = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth/signup" element={<SignUpForm />} />
        <Route path="/auth/login" element={<LoginForm />} />

        {/* End User Layout */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/*Routes For Admin*/}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={isAdmin} adminOnly={true}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
