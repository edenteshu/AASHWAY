const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  {
    id: 1,
    name: "Sample Product",
    price: 99.99,
    shortDescription: "This is a short description of the product.",
    details: "Detailed description and specifications of the product...",
    images: [
      "https://via.placeholder.com/400x300.png?text=Product+Image+1",
      "https://via.placeholder.com/400x300.png?text=Product+Image+2",
      "https://via.placeholder.com/400x300.png?text=Product+Image+3",
    ],
    reviews: [
      {
        name: "Hana",
        rating: 4,
        comment: "Wow beautiful! The quality is amazing.",
      },
      {
        name: "Abel",
        rating: 5,
        comment: "Very nice, it fits my beautiful wife perfectly",
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Related Product 1",
        price: 49.99,
        image: "https://via.placeholder.com/200.png?text=Related+Product+1",
      },
      {
        id: 3,
        name: "Related Product 2",
        price: 59.99,
        image: "https://via.placeholder.com/200.png?text=Related+Product+2",
      },
    ],
  },
];

// API route to get product data by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
// API route to handle checkout and save orders
app.post("/api/checkout", async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      address: req.body.address,
      cardNumber: req.body.cardNumber,
      cartItems: req.body.cartItems,
      totalPrice: req.body.totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error processing order", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
