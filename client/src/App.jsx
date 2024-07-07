import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-routes";
import { Layout } from "./components/admin-layout";
import { CustomerLayout } from "./components/customer-layout";
import Home from "./components/Home";
import Orders from "./pages/Order";
import Products from "./pages/manage-product";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
// import Orders from "./components/Order";
// import Products from "./components/Products";
// import Customers from "./components/Customers";
// import Analytics from "./components/Analytics";

const isAdmin = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} /> */}
        </Route>

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
