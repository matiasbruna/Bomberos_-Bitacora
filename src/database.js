import { connect } from "mongoose";
import mg from "mongoose";

(async () => {
  try {
    mg.set("strictQuery", false);
    const db = await connect("mongodb://127.0.0.1:27017/test");
    console.log("BD conectada con", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();



// direccion para la coneccion a la base de datos en ATLAS: "mongodb+srv://matiasbdev:rxjeQQvoPWSTigeZ@bvsf.9vfczge.mongodb.net/?retryWrites=true&w=majority"
// direccion para la base de datos local:  "mongodb://127.0.0.1:27017/test"