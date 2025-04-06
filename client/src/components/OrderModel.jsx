import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const OrderModal = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    customerName,
    setCustomerName,
    cart,
    submitOrder,
  } = useContext(CartContext);

  const handleClose = () => setIsOrderModalOpen(false);

  return (
    <Modal
      open={isOrderModalOpen}
      onClose={handleClose}
      aria-labelledby="order-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Review Your Order
        </Typography>

        <List dense>
          {cart.map((item, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={item.product.name}
                  secondary={`Qty: ${item.quantity} - $${(
                    item.product.price * item.quantity
                  ).toFixed(2)}`}
                />
              </ListItem>
              {index < cart.length - 1 && <Divider />}
            </div>
          ))}
        </List>

        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
          Total: $
          {cart
            .reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )
            .toFixed(2)}
        </Typography>

        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ mt: 3, mb: 2 }}
          required
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={submitOrder}
            disabled={!customerName.trim() || cart.length === 0}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderModal;
