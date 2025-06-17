import express from "express";
import { engine } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import bomberoRoutes from "./routes/bomberos.routes";
import unidadesRoutes from "./routes/unidades.routes";
import novedadesRoutes from "./routes/novedades.routes";
import movimientoUnidades from "./routes/movimientosUnidades.routes";
import novedadesPersonal from "./routes/novedadesPersonal.routes";
import loginRoutes from "./routes/login.routes";
import flash from "connect-flash";
import path from "path";
import morgan from "morgan";

const app = express();

const hbs = engine({
  extname: "hbs",
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
    ifEquals: function (a, b, options) {
      return a == b ? options.fn(this) : options.inverse(this);
    },
    contains: function (elem, list, options) {
      if (Array.isArray(list) && list.map(String).includes(elem.toString())) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    isChecked: function (list, value) {
      if (!Array.isArray(list)) return '';
      return list.includes(Number(value)) ? 'checked' : '';
    }
  }
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Rutas
app.use(indexRoutes);
app.use(bomberoRoutes);
app.use(unidadesRoutes);
app.use(novedadesRoutes);
app.use(movimientoUnidades);
app.use(loginRoutes);
app.use(novedadesPersonal);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

export default app;


