import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uplaodRoutes from "./routes/uploadRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uplaodRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if(process.env.NODE_MODE === 'development'){
  app.use(morgan('dev'))
}
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if(process.env.NODE_MODE === 'production'){
  app.use(express.static(path.join(__dirname,'/frontend/build')))
  app.get('*', (res,req) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get("/", (req, res) => {
    res.send("(▀̿Ĺ̯▀̿ ̿) - Server Running....");
  });
}
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
