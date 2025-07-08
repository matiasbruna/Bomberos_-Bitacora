import { Schema, model } from "mongoose";

// Subdocumento para cada dotación
const dotacionSchema = new Schema({
  unidad: {
    type: Schema.Types.ObjectId,
    ref: "Unidades",
    required: true,
  },
  chofer: {
    type: Schema.Types.ObjectId,
    ref: "Bomberos",
    required: true,
  },
  jefeDotacion: {
    type: Schema.Types.ObjectId,
    ref: "Bomberos",
    required: true,
  },
  bomberos: [{
    type: Schema.Types.ObjectId,
    ref: "Bomberos",
  }],
  horaSalida: {
    type: String,
  },
  horaLlegada: {
    type: String,
  },
  horaRegreso: {
    type: String,
  },
  observaciones: String,
}, { _id: false });

const siniestroSchema = new Schema(
  {
    numeroParte: {
      type: Number,
      required: true,
      unique: true,
    },

    fecha: {
      type: Date,
      required: false,
    },

    horaAlarma: {
      type: String,
      required: false,
    },

    tipoDeSiniestro: {
      type: String,
      required: true,
    },

    detalleDelSiniestro: {
      type: String,
    },

    direccion: {
      type: String,
      required: false,
    },

    localidad: {
      type: String,
    },

    llamante: {
      nombre: String,
      apellido: String,
      dni: Number,
      telefono: String,
    },

    jefeDeGuardia: {
      type: Schema.Types.ObjectId,
      ref: "Bomberos",
      required: false,
    },

    jefeDeSiniestro: {
      type: Schema.Types.ObjectId,
      ref: "Bomberos",
      required: false,
    },

    dotaciones: [dotacionSchema],

    bomberosEnCuartel: [{
      type: Schema.Types.ObjectId,
      ref: "Bomberos",
    }],

    observaciones: {
      type: String,
    },

    finalizado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Siniestros", siniestroSchema);
