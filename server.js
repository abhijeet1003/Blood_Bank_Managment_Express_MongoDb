const express = require("express");
const colors = require('colors');
const morgan = require('morgan');


const app = express();

// dotenv
const dotenv = require('dotenv')
dotenv.config();

// MongoDb connection
const connectDb = require("./config/db");
connectDb();

// middlewares
app.use(express.json())
app.use(morgan('dev'));


// Routes
const testRoute = require("./routes/testRoutes");
const authRoute = require('./routes/authRoutes')
const inventoryRoute = require("./routes/inventoryRoutes")
const adminRoute = require("./routes/adminRoutes")


app.use("/api/test", testRoute);
app.use('/api/auth',authRoute)
app.use('/api/inventory',inventoryRoute)
app.use('/api/admin',adminRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Node Server RUnning On ${PORT}`.bgBlue);
});

