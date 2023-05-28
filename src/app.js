import express from "express";
import { engine } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import bomberoRoutes from "./routes/bomberos.routes";
import unidadesRoutes from "./routes/unidades.routes";
import novedaesRoutes from "./routes/novedades.routes";
import movimientoUnidades from "./routes/movimientosUnidades.routes";
import loginRoutes from "./routes/login.routes";

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

//configuracion de las rutas
app.use(indexRoutes);
app.use(bomberoRoutes);
app.use(unidadesRoutes);
app.use(novedaesRoutes);
app.use(movimientoUnidades);
app.use(loginRoutes);

//configuracion de los archivos estaticos.

app.use(express.static(path.join(__dirname, "public")));
export default app;
