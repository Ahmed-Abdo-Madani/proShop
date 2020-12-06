import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.send("(▀̿Ĺ̯▀̿ ̿) - Server Running....");
});
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    "(▀̿Ĺ̯▀̿ ̿)".bgYellow.black.bold +
      ` - Server Watching in ${process.env.NODE_MODE} mode on Port ${port} -`
        .yellow.underline.bold
  )
);
