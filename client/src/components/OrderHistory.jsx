import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartContext } from "../context/CartContext";

const OrderHistory = () => {
  const [customerName, setCustomerName] = useState("");
  const [orders, setOrders] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { getCartItemCount } = useContext(CartContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  // In client/src/components/OrderHistory.js
  const handleSearch = async () => {
    if (!customerName.trim()) {
      alert("Please enter a customer name");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/orders`, {
        params: { customerName: customerName.trim() },
      });
      setOrders(response.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setSearchPerformed(true);
      alert("Error fetching orders. Please try again.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Customer Name"
          variant="outlined"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ minWidth: 120 }}
        >
          Search
        </Button>
      </Box>

      {searchPerformed && orders.length === 0 && (
        <Typography variant="body1">
          No orders found for this customer.
        </Typography>
      )}

      {orders.map((order) => (
        <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order #{order._id.slice(-6).toUpperCase()} -{" "}
            {new Date(order.createdAt).toLocaleString()}
          </Typography>
          <List>
            {order.products.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={item.productId.name}
                    secondary={`Quantity: ${item.quantity} - $${(
                      item.productId.price * item.quantity
                    ).toFixed(2)}`}
                  />
                </ListItem>
                {index < order.products.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
            Total: $
            {order.products
              .reduce(
                (total, item) => total + item.productId.price * item.quantity,
                0
              )
              .toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <IconButton
              color="error"
              onClick={() => handleDeleteOrder(order._id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default OrderHistory;
