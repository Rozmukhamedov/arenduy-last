import { useAuth } from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import "../style/profile.css";

function ProfilePage() {
  const { removeCookie, setIsLoggedIn } = useAuth();
  const handleLogout = () => {
    removeCookie("tokens");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="profile-tabs">
        <NavLink
          to="myproducts"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Объявления
        </NavLink>

        <NavLink
          to="setting-profile"
          className={({ isActive }) =>
            isActive ? " active setting-profile" : "setting-profile"
          }
        >
          Настройка профиля
        </NavLink>

        <NavLink
          onClick={handleLogout}
          to="/"
          className={({ isActive }) => (isActive ? " active" : "inactive")}
        >
          Выход
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default ProfilePage;
