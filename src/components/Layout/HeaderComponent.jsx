import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IMAGES, URL } from "../../constants/applicationConstants";
import useWindowSize from "../../hooks/useWindowSize";
import BottomMenu from "./NavigationComponent";
import "../../style/header.css";
import SubMenu from "./SidebarItemComponent";
import {
  FaBars,
  FaTimes,
  FaSearchLocation,
  FaPlus,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import Search from "../SearchComponent";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import CustomSmpButton from "../CustomSmpButton";

function Navbar() {
  const { isLoggedIn } = useAuth();
  const { isMobile } = useWindowSize();
  const [categories, setCategories] = useState([]);

  const [sidebar, setSidebar] = useState(false);
  // const [subnav, setSubnav] = useState(false);

  const Show = () => {
    setSidebar(false);
    // setSubnav(false);
  };

  const [categoriesError, categoriesIsLoading, categoriesFetcher] =
    useCustomFetcher();

  useEffect(() => {
    categoriesFetcher((data) => setCategories(data), `${URL}/category/`, {});
  }, []);

  return (
    <>
      {!isMobile ? (
        <>
          <div className="header-nav">
            <div
              className="header-button"
              onClick={() => {
                setSidebar(!sidebar);
              }}
            >
              <FaBars />
            </div>
            <Link onClick={() => setSidebar(false)} to="/">
              <img className="header-logo" src={IMAGES.imgLogo} alt="Arenduy" />
            </Link>

            <div className="header-end">
              <Search classForm={"search"} func={() => setSidebar()} />

              <Link to="/map" onClick={() => setSidebar(false)}>
                <CustomSmpButton
                  textBtn={"Карта"}
                  background={"#fff"}
                  fontSize={"18px"}
                  color={"#9a78cb"}
                  padding={"10px 10px"}
                  border={"none"}
                  borderRadius={"6px"}
                  height={"40px"}
                  padding={"10px 15px"}
                  btnClassName={"box-shadow"}
                  iconBtn={<FaSearchLocation className="map-icon" />}
                  margin={"0 10px"}
                />
              </Link>

              {!isLoggedIn ? (
                <Link to="/login" onClick={() => setSidebar(false)}>
                  <CustomSmpButton
                    textBtn={"Войти"}
                    background={"#fff"}
                    fontSize={"18px"}
                    color={"#9a78cb"}
                    padding={"10px 10px"}
                    border={"none"}
                    borderRadius={"6px"}
                    height={"40px"}
                    padding={"10px 15px"}
                    btnClassName={"box-shadow"}
                  />
                </Link>
              ) : (
                <>
                  <Link onClick={() => setSidebar(false)} to="addform">
                    <CustomSmpButton
                      background={"#fff"}
                      fontSize={"19px"}
                      color={"#9a78cb"}
                      padding={"10px 10px"}
                      border={"none"}
                      borderRadius={"50%"}
                      height={"40px"}
                      width={"40px"}
                      iconBtn={<FaPlus />}
                    />
                  </Link>
                  <Link onClick={() => setSidebar(false)} to="favourite">
                    <CustomSmpButton
                      background={"none"}
                      fontSize={"32px"}
                      color={"#9a78cb"}
                      padding={"5px 8px"}
                      border={"none"}
                      height={"40px"}
                      width={"40px"}
                      iconBtn={<FaHeart />}
                    />
                  </Link>
                  <Link
                    onClick={() => setSidebar(false)}
                    className="button-icon-user"
                    to="profile"
                  >
                    <FaUserCircle />
                  </Link>
                </>
              )}
            </div>
          </div>
          <div
            className="header-sidebar"
            style={{ left: `${sidebar ? "0" : "-100%"}` }}
          >
            <div className="header-wrap">
              {categories.map((category) => {
                return (
                  <SubMenu
                    // subnav={subnav}
                    // setSubnav={setSubnav}
                    setSidebar={setSidebar}
                    key={category.slug}
                    category={category}
                  />
                );
              })}
            </div>
            <div
              className="header-button header-button-close"
              onClick={() => setSidebar(false)}
            >
              <FaTimes />
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="header-nav">
            <div
              className="header-button"
              onClick={() => {
                setSidebar(!sidebar);
              }}
            >
              <FaBars />
            </div>
            <Link className="mobile-logo" onClick={Show} to="/">
              <img className="header-logo" src={IMAGES.imgLogo} alt="Arenduy" />
            </Link>
            <div className="header-end">
              <Link to="/map">
                <CustomSmpButton
                  fontSize={"30px"}
                  background={"none"}
                  color={"#fff"}
                  padding={"10px 10px"}
                  border={"none"}
                  borderRadius={"6px"}
                  padding={"10px 15px"}
                  iconBtn={<FaSearchLocation className="map-icon" />}
                />
              </Link>
            </div>
          </div>
          <div
            className="header-sidebar"
            style={{ left: `${sidebar ? "0" : "-100%"}` }}
          >
            <div className="header-wrap">
              {categories.map((category) => {
                return (
                  <SubMenu
                    // subnav={subnav}
                    // setSubnav={setSubnav}
                    // setSidebar={setSidebar}
                    key={category.slug}
                    category={category}
                  />
                );
              })}
            </div>
            <div className="header-button header-button-close" onClick={Show}>
              <FaTimes />
            </div>
          </div>
          <BottomMenu />
        </div>
      )}
    </>
  );
}

export default Navbar;
