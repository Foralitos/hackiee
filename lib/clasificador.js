// Asigna un acta a una de las tres colas operativas según el resultado del
// OCR (confianzas) y del validador determinista (errores aritméticos).
//
// - roja: hay al menos un error matemático verificado (validación falló).
// - amarilla: la matemática cuadra pero algún campo crítico tiene baja confianza
//   o el modelo no pudo leer datos suficientes para validar.
// - verde: todo cuadra y la confianza supera el umbral.

const UMBRAL_CONFIANZA_CAMPO = 0.7;
const UMBRAL_CONFIANZA_GENERAL = 0.75;

function confianzaCampo(c) {
  if (c == null) return 0;
  if (typeof c === "number") return c;
  if (typeof c === "object" && typeof c.confidence === "number") return c.confidence;
  return 0;
}

function camposBajaConfianza(extraccion) {
  const flagged = [];

  if (confianzaCampo(extraccion.totalVotos) < UMBRAL_CONFIANZA_CAMPO) {
    flagged.push("totalVotos");
  }
  if (confianzaCampo(extraccion.nulos) < UMBRAL_CONFIANZA_CAMPO) {
    flagged.push("nulos");
  }
  if (confianzaCampo(extraccion.noRegistrados) < UMBRAL_CONFIANZA_CAMPO) {
    flagged.push("noRegistrados");
  }
  for (const [i, p] of (extraccion.votosPorPartido || []).entries()) {
    if (confianzaCampo(p) < UMBRAL_CONFIANZA_CAMPO) {
      flagged.push(`votosPorPartido[${i}] (${p.partido || "?"})`);
    }
  }
  return flagged;
}

export function clasificar(extraccion, validacion) {
  // 1. Cualquier error matemático verificado → roja, sin importar la confianza.
  if (validacion.errores && validacion.errores.length > 0) {
    return {
      cola: "roja",
      motivo: "Inconsistencia matemática detectada",
      detalles: validacion.errores.map((e) => e.regla),
    };
  }

  // 2. Validaciones indeterminadas (faltó leer datos) → amarilla.
  if (validacion.indeterminados && validacion.indeterminados.length > 0) {
    return {
      cola: "amarilla",
      motivo: "Faltan datos legibles para validar matemáticamente",
      detalles: validacion.indeterminados.map((e) => e.regla),
    };
  }

  // 3. Confianza baja en campos críticos o general → amarilla.
  const flagged = camposBajaConfianza(extraccion);
  const confGeneral =
    typeof extraccion.confianzaGeneral === "number"
      ? extraccion.confianzaGeneral
      : 1;

  if (flagged.length > 0 || confGeneral < UMBRAL_CONFIANZA_GENERAL) {
    return {
      cola: "amarilla",
      motivo: "Campos con baja confianza de lectura",
      detalles: flagged,
      confianzaGeneral: confGeneral,
    };
  }

  // 4. Todo limpio → verde.
  return {
    cola: "verde",
    motivo: "Lectura clara y matemática consistente",
    confianzaGeneral: confGeneral,
  };
}

export const UMBRALES = {
  campo: UMBRAL_CONFIANZA_CAMPO,
  general: UMBRAL_CONFIANZA_GENERAL,
};
