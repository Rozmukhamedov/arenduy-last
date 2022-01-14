import { Outlet } from "react-router-dom";
import Navbar from "./HeaderComponent";
import Footer from "./FooterComponent";
import "../../style/layout.css";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
