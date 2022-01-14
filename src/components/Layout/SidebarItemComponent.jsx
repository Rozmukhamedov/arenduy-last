import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCustomFetcher from "../../hooks/useCustomFetcher";
import "../../style/sidebaritem.css";
import { URL } from "../../constants/applicationConstants";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const SubMenu = ({ category, setSidebar, subnav, setSubnav }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoriesError, subcategoriesIsLoading, subcategoriesFetcher] =
    useCustomFetcher();

  const [itemLink, setItemLink] = useState(false);
  const showSubnav = () => setItemLink(!itemLink);

  useEffect(() => {
    subcategoriesFetcher(
      (data) => setSubcategories(data),
      `${URL}/category/${category.slug}`,
      {}
    );
  }, []);

  return (
    <>
      <div class="item-link" onClick={() => setSubnav(!subnav)}>
        <div>
          <div className="item-span">{category.name}</div>
        </div>
        <div className="item-icon-dropdown">
          {subnav ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      {subnav &&
        subcategories.map((subcategory) => {
          return (
            <Link
              className="dropdown-item"
              to={`${category.slug}/${subcategory.slug}/`}
              key={subcategory.slug}
              onClick={() => {
                setSidebar(false);
                setSubnav(false);
              }}
            >
              <div className="item-span">{subcategory.name}</div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
