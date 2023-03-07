import { connect } from "mongoose";
import mg from "mongoose";

(async () => {
  try {
    mg.set("strictQuery", false);
    const db = await connect("mongodb://127.0.0.1:27017/BDbvsf");
    console.log("BD conectada con", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
