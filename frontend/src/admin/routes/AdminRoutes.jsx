import { Route } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import EditProduct from "../pages/EditProduct";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

const AdminRoutes = (
  <Route
    path="/admin"
    element={
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    }>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="add-product" element={<AddProduct />} />
    <Route path="orders" element={<Orders />} />
    <Route path="users" element={<Users />} />
    <Route path="edit-product/:id" element={<EditProduct />} />
  </Route>
);

export default AdminRoutes;
