import { connect } from "mongoose";
import mg from "mongoose";

(async () => {
  try {
    mg.set("strictQuery", false);
    const db = await connect("mongodb+srv://matiasbdev:rxjeQQvoPWSTigeZ@bvsf.9vfczge.mongodb.net/?retryWrites=true&w=majority");
    console.log("BD conectada con", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
