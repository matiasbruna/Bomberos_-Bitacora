import { Schema, model } from "mongoose";

const asistenciaGuardiaSchema = new Schema(
  {
    bombero: {
      type: Schema.Types.ObjectId,
      ref: "Bomberos",
      required: true,
    },
    fechaHora: {
      type: Date,
      required: true,
    },
    asistio: {
      type: Boolean,
      required: true,
    },
    numeroSiniestro: {
      type: Number,
      default: null,
    },
    observacion: {
      type: String,
      default: "",
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("AsistenciasGuardia", asistenciaGuardiaSchema);