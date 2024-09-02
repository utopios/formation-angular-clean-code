const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let customers = [];
let products = [];
let orders = [];
let payments = [];

app.use(bodyParser.json());

// Routes for Customers
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.post('/api/customers', (req, res) => {
  const newCustomer = {
    id: Date.now(),
    n: req.body.n,
    e: req.body.e
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.delete('/api/customers/:id', (req, res) => {
  customers = customers.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).end();
});

// Routes for Products
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: Date.now(),
    n: req.body.n,
    pr: req.body.pr,
    s: req.body.s
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.get('/api/products', (req, res) => {
  const product = products.find(p => p.n === req.query.name);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.put('/api/products/:id/stock', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    product.s = req.body.stock;
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Routes for Orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: Date.now(),
    cName: req.body.cName,
    pName: req.body.pName,
    qty: req.body.qty,
    total: req.body.total,
    status: req.body.status
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/cancel', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    order.status = 'Annulée';
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Routes for Payments
app.post('/api/payments', (req, res) => {
  const newPayment = {
    id: Date.now(),
    cardNumber: req.body.cardNumber,
    cardHolder: req.body.cardHolder,
    expiryDate: req.body.expiryDate,
    cvv: req.body.cvv
  };
  payments.push(newPayment);
  res.status(201).json(newPayment);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});