import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import Registration from "../pages/Registrationpage";
import Notfoundpage from "../pages/NotFoundPage";
import Layout from "../components/Layout/LayoutComponent";
import PrivateAuth from "../hoc/PrivateAuth";
import PublicAuth from "../hoc/PublicAuth";
import { AuthProvider } from "../hoc/AuthProvider";
import Confirm from "../pages/Confirmpage";
import ProfilePage from "../pages/ProfilePage";
import SearchResultPage from "../pages/SearchResultPage";
import SettingProfile from "../components/Profile/SettingProfileComponent";
import MyProducts from "../components/Profile/MyProductsComponent";
import FavouritePage from "../pages/FavouritePage";
import YandexMap from "../components/YandexMap";
import FilterResultPage from "../pages/FilterResultPage";
import CreateProduct from "../components/CreateProductComponent";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ConfirmPassword from "../pages/ConfirmPasswordPage";

function RoutesMain() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchResultPage />} />
            <Route path="filter" element={<FilterResultPage />} />
            <Route
              path="login"
              element={
                <PublicAuth>
                  <LoginPage />
                </PublicAuth>
              }
            />
            <Route
              path="registration"
              element={
                <PublicAuth>
                  <Registration />
                </PublicAuth>
              }
            />
            <Route
              path="registration/confirm"
              element={
                <PublicAuth>
                  <Confirm />
                </PublicAuth>
              }
            />
            <Route
              path="forgot-password"
              element={
                <PublicAuth>
                  <ResetPasswordPage />
                </PublicAuth>
              }
            />
            <Route
              path="forgot-password/confirm"
              element={
                <PublicAuth>
                  <ConfirmPassword />
                </PublicAuth>
              }
            />
            <Route
              path="create-product"
              element={
                <PrivateAuth>
                  <CreateProduct />
                </PrivateAuth>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateAuth>
                  <ProfilePage />
                </PrivateAuth>
              }
            >
              <Route path="setting-profile" element={<SettingProfile />} />
              <Route path="myproducts" element={<MyProducts />} />
            </Route>

            <Route
              path="favourite"
              element={
                <PrivateAuth>
                  <FavouritePage />
                </PrivateAuth>
              }
            />

            <Route path=":category" element={<Navigate to="/" />} />
            <Route path=":category/:subcategory" element={<ProductsPage />} />
            <Route
              path=":category/:subcategory/:slug"
              element={<ProductPage />}
            />

            <Route path="*" element={<Notfoundpage />} />
          </Route>
          <Route path="map" element={<YandexMap />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default RoutesMain;
