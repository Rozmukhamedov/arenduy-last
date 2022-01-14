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
import ProductAdd from "../pages/Productaddpage";
import SearchResultPage from "../pages/SearchResultPage";
import RealestateAdd from "../components/productadd/realestateaddcomponent";
import TransportAdd from "../components/productadd/transportaddcomponent";
import SettingProfile from "../components/Profile/SettingProfileComponent";
import MyProducts from "../components/Profile/MyProductsComponent";
import FavouritePage from "../pages/FavouritePage";
import YandexMap from "../components/YandexMap";

function RoutesMain() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
            ></Route>
            <Route
              path="registration/confirm"
              element={
                <PublicAuth>
                  <Confirm />
                </PublicAuth>
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
              path="addform"
              element={
                <PrivateAuth>
                  <ProductAdd />
                </PrivateAuth>
              }
            >
              <Route path="real-estate" element={<RealestateAdd />} />
              <Route path="transport" element={<TransportAdd />} />
            </Route>
            <Route
              path="favourite"
              element={
                <PrivateAuth>
                  <FavouritePage />
                </PrivateAuth>
              }
            />
            <Route path="map" element={<YandexMap />} />
            <Route path=":category" element={<Navigate to="/" />} />
            <Route path=":category/:subcategory" element={<ProductsPage />} />
            <Route
              path=":category/:subcategory/:slug"
              element={<ProductPage />}
            />
            <Route path="search" element={<SearchResultPage />} />
            <Route path="*" element={<Notfoundpage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default RoutesMain;
