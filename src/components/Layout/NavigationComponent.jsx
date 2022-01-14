import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";

function BottomMenu() {
  return (
    <Paper
      sx={{ position: "fixed", zIndex: "1", bottom: 0, left: 0, right: 0 }}
      elevation={4}
      index="4"
      style={{ zIndex: "2" }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Recents" icon={1} />
        <BottomNavigationAction label="Favorites" icon={2} />
        <BottomNavigationAction label="Archive" icon={3} />
        <Link to="/login">
          <BottomNavigationAction label="Archive" icon={4} />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}

export default BottomMenu;
