import { Schema, model } from "mongoose";

const bomberosSchema = new Schema(
  {
    dni: {
      type: Number,
      require: true,
      unique: true,
    },
    nOrden: {
      type: Number,
      require: true,
    },
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    Apellido: {
      type: String,
      require: true,
      trim: true,
    },
    Rango: {
      type: String,
      require: true,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Bomberos", bomberosSchema);
