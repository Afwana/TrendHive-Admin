import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/check-auth";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminAccount from "./pages/admin-view/account";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminCategory from "./pages/admin-view/category";
import AdminFooter from "./pages/admin-view/footer";
import AdminReturn from "./pages/admin-view/return";
import AdminReviews from "./pages/admin-view/reviews";
import AdminBrands from "./pages/admin-view/brand";
import AdminFeatures from "./pages/admin-view/features";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-full h-screen bg-black" />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}></CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="footer" element={<AdminFooter />} />
          <Route path="return" element={<AdminReturn />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="brands" element={<AdminBrands />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
