// backend/index.js - Updated with Zerodha integration

require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

// Existing models
const { HoldingsModel } = require('./models/HoldingsModel'); 
const { PositionsModel } = require('./models/PositionsModel'); 
const { OrdersModel } = require('./models/OrdersModel'); 
const AuthRoute = require('./AuthRoute');

// let ZerodhaRoutes = require('./utils/ZerodhaRoutes');
let ZerodhaRoutes;

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Your existing routes for mock data
app.get('/allHoldings', async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.send(allHoldings);
});

app.get('/allPositions', async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.send(allPositions);
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {
    // 1. Save or update order
    await OrdersModel.findOneAndUpdate(
      { name, mode },
      {
        $inc: { qty: qty },
        $set: { price: price },
      },
      { upsert: true, new: true }
    );

    // 2. Get existing holding
    const existing = await HoldingsModel.findOne({ name });

    if (mode === "BUY") {
      if (existing) {
        // update avg price and qty
        const totalQty = existing.qty + qty;
        const newAvg = (existing.qty * existing.avg + qty * price) / totalQty;

        existing.qty = totalQty;
        existing.avg = newAvg;
        existing.price = price; // latest price
        await existing.save();
      } else {
        // create new holding
        await HoldingsModel.create({
          name,
          qty,
          avg: price,
          price,
          net: "+0%",
          day: "+0%",
        });
      }
    }

    if (mode === "SELL") {
      if (!existing || existing.qty < qty) {
        return res.status(400).send("Not enough stock to sell");
      }

      existing.qty -= qty;

      if (existing.qty === 0) {
        await HoldingsModel.deleteOne({ name });
      } else {
        await existing.save();
      }
    }

    res.send("Order and Holdings updated successfully!");
  } catch (err) {
    console.error("Order update error:", err);
    res.status(500).send("Server error");
  }
});

app.get('/allOrders', async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.send(allOrders);
});

// Existing auth routes
app.use("/", AuthRoute);

// NEW: Add Zerodha live data routes
app.use('/api/zerodha', ZerodhaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Add this after your existing requires (SAFE)
try {
    ZerodhaRoutes = require('./utils/ZerodhaRoutes');
} catch (error) {
    console.log('Zerodha routes not available:', error.message);
    ZerodhaRoutes = null;
}

// Add this after your existing routes, before app.listen() (SAFE)
if (ZerodhaRoutes) {
    app.use('/api/zerodha', ZerodhaRoutes);
    console.log('✅ Zerodha routes loaded successfully');
} else {
    console.log('⚠️ Zerodha routes not loaded - running in basic mode');
}

// ADD THESE 2 LINES ONLY - 100% SAFE
try {
  ZerodhaRoutes = require('./routes/ZerodhaRoutes');
  app.use('/api/zerodha', ZerodhaRoutes);
  console.log('✅ Zerodha integration loaded');
} catch (error) {
  console.log('⚠️ Zerodha integration not available:', error.message);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("MongoDB connection error:", err));
});