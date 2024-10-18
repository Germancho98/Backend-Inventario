const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Reemplaza con la URL donde corre tu frontend (por ejemplo: http://localhost:3000)
    credentials: true
}));

const productRoute = require('./routes/productRoutes');
const historyRoute = require('./routes/historyRoutes');
const movementRoute = require('./routes/movementRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const userRoute = require('./routes/userRoutes');
const reportRoute = require('./routes/reportRoutes'); // Añadir la ruta de reportes

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to the database"))
    .catch(err => console.log("Error: Could not establish a connection to the database.", err));

app.use("/api/products", productRoute);
app.use("/api/history", historyRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/movements", movementRoute);
app.use("/api/users", userRoute);
app.use("/api/reports", reportRoute); // Añadir la ruta de reportes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;