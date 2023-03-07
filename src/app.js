import express from "express";
import { engine } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import path from "path";
import morgan from "morgan";

const app = express();

//consfiguarar el motor de plantillas (handelbars)
app.engine(
  "hbs",
  engine({
    PartialsDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

//configuracionde Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(indexRoutes);

export default app;
