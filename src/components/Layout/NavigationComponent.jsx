import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FaHeart, FaHome, FaPlusCircle, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function BottomMenu() {
  return (
    <Paper
      sx={{ position: "fixed", zIndex: "1", bottom: 0, left: 0, right: 0 }}
      elevation={4}
      index="4"
      style={{ zIndex: "2" }}
    >
      <BottomNavigation style={{ background: "#58b7fd" }} showLabels>
        <Link to="/">
          <BottomNavigationAction
            style={{ fontSize: "30px", color: "#fff" }}
            icon={<FaHome />}
          />
        </Link>

        <Link to="create-product">
          <BottomNavigationAction
            style={{ fontSize: "28px", color: "#fff" }}
            icon={<FaPlusCircle />}
          />
        </Link>
        <Link to="favourite">
          <BottomNavigationAction
            style={{ fontSize: "28px", color: "#9a78cb" }}
            icon={<FaHeart />}
          />
        </Link>

        <Link to="login">
          <BottomNavigationAction
            style={{ fontSize: "28px", color: "#fff" }}
            icon={<FaUserCircle />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}

export default BottomMenu;
