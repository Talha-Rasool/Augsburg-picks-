import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  Modal,
  Box,
  TextField,
} from "@mui/material";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomersName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const {
    addToCart,
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
    setIsOrderModalOpen,
    confirmOrder,
    setCustomerName,
  } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }
    confirmOrder(customerName, quantity);
    setCustomersName("");
    setQuantity(1);
  };

  const handleAddToCart = (product) => {
    // Reset form fields when adding new items
    setCustomerName("");

    // Add product to cart (implement this in your CartContext)
    addToCart(product);

    // Open the order modal
    setIsOrderModalOpen(true);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 200, objectFit: "contain", p: 1 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 2 }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            borderRadius: 1,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Order Details for {selectedProduct?.name}
          </Typography>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" mb={2}>
            Total: ${(selectedProduct?.price * quantity).toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDisplay;
