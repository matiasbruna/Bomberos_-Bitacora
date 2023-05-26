import { Schema, model } from "mongoose";

const bomberosSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    apellido: {
      type: String,
      require: true,
      trim: true,
    },
    dni: {
      type: Number,
      require: true,
      unique: true,
    },
    nOrden: {
      type: Number,
      require: true,
    },
    rango: {
      type: String,
      require: true,
      trim: true,
    },
    activo:{
      type: Boolean,
      require: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Bomberos", bomberosSchema);
