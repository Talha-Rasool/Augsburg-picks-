import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Badge, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { getCartItemCount } = useContext(CartContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Augsburg-Picks
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/history"
            startIcon={<HistoryIcon />}
          >
            History
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={
              <Badge badgeContent={getCartItemCount()} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
          >
            Cart
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
