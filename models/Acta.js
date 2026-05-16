import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const decisionSchema = new mongoose.Schema(
  {
    operador: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tipo: {
      type: String,
      enum: ["validar", "corregir", "devolver", "reprocesar"],
      required: true,
    },
    payload: mongoose.Schema.Types.Mixed,
    nota: String,
  },
  { timestamps: true, _id: true }
);

const actaSchema = mongoose.Schema(
  {
    casilla: { type: mongoose.Schema.Types.ObjectId, ref: "Casilla" },

    imagen: {
      secureUrl: { type: String, required: true },
      publicId: String,
      width: Number,
      height: Number,
      bytes: Number,
    },

    // OCR raw output exactly as the model returned it.
    extraccion: mongoose.Schema.Types.Mixed,

    // Validator output: { ok, errores, indeterminados, checks }.
    validacion: mongoose.Schema.Types.Mixed,

    // Classifier output: { cola, motivo, detalles }.
    clasificacion: {
      cola: {
        type: String,
        enum: ["verde", "amarilla", "roja"],
        required: true,
      },
      motivo: String,
      detalles: [String],
      confianzaGeneral: Number,
    },

    estado: {
      type: String,
      enum: [
        "pendiente",
        "en_revision",
        "esperando_verificacion",
        "discrepancia",
        "validada",
        "corregida",
        "devuelta",
      ],
      default: "pendiente",
    },

    decisiones: [decisionSchema],

    // Telemetría del LLM para auditoría y control de costo.
    modelo: String,
    usage: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

actaSchema.plugin(toJSON);

export default mongoose.models.Acta || mongoose.model("Acta", actaSchema);
