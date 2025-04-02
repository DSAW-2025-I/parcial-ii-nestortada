// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array with products
let products = [
  { id: 1, name: "Tortillas", price: 10.99 },
  { id: 2, name: "Chocolates", price: 19.99 },
  { id: 3, name: "Quesos", price: 5.99 }
];

/**
 * GET /products
 * Returns the complete list of products in JSON format.
 */
app.get('/products', (req, res) => {
  res.json(products);
});

/**
 * GET /products/:id
 * Returns a product by its id.
 * If the product is not found, returns a 404 error.
 */
app.get('/products/:id', (req, res) => {
  // Convert the id from the URL parameter to a number
  const id = parseInt(req.params.id, 10);
  // Find the product with the specified id
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  res.json(product);
});

/**
 * POST /products
 * Adds a new product to the list.
 * The product data must be sent in the request body in JSON format.
 * If a product with the given id already exists, returns a 400 Bad Request error.
 */
app.post('/products', (req, res) => {
  const newProduct = req.body;
  
  // Basic validation to ensure id, name, and price are provided
  if (!newProduct.id || !newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Falta datos requeridos: id, name, price' });
  }
  
  // Check that the product id is unique
  const exists = products.some(p => p.id === newProduct.id);
  if (exists) {
    return res.status(400).json({ error: 'El producto con ese ID ya existe' });
  }
  
  // Add the new product to the in-memory array
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});
