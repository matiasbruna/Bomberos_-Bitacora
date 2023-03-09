import { Schema, model } from "mongoose";

const unidadesSchema = new Schema(
  {
    numero: {
      type: Number,
      require: true,
      trim: true,
    },
    marca: {
      type: String,
      require: true,
      trim: true,
    },
    propocito: {
      type: String,
      require: true,
      trim: true,
    },
    km: {
      type: Number,
      require: true,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Unidades", unidadesSchema);