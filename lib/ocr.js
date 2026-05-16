import { getOpenRouter, DEFAULT_OCR_MODEL } from "./openrouter";

const SYSTEM_PROMPT = `Eres un asistente de digitalización de actas electorales mexicanas (Acta de Escrutinio y Cómputo).

Recibirás la imagen de un acta y debes devolver EXCLUSIVAMENTE un objeto JSON con este esquema:

{
  "identificacion": {
    "entidad": string|null,
    "distrito": string|null,
    "seccion": string|null,
    "casilla": string|null,
    "tipoEleccion": string|null
  },
  "boletas": {
    "recibidas": integer|null,
    "sobrantes": integer|null,
    "personasQueVotaron": integer|null,
    "repsPartidos": integer|null
  },
  "votosPorPartido": [
    { "partido": string, "votos": integer|null, "confidence": number }
  ],
  "noRegistrados": { "votos": integer|null, "confidence": number },
  "nulos": { "votos": integer|null, "confidence": number },
  "totalVotos": { "votos": integer|null, "confidence": number },
  "confianzaGeneral": number
}

Reglas estrictas:
- NO inventes números. Si un campo está vacío, ilegible o ausente, devuelve null y confidence 0.
- "confidence" es 0–1 según qué tan legible está el manuscrito del campo (1 = totalmente claro, 0 = ilegible).
- "confianzaGeneral" es tu impresión global de la legibilidad del acta (0–1).
- Para "votosPorPartido", incluye una entrada por cada fila de partido/coalición/candidatura independiente que veas, en el orden en que aparecen.
- Responde SOLO con el JSON. Sin markdown, sin explicación, sin texto fuera del objeto.`;

// Extracts structured fields from an acta image hosted at a public URL.
// Returns the parsed JSON object emitted by the model, plus raw usage stats.
export async function extraerActa(imageUrl, { model = DEFAULT_OCR_MODEL } = {}) {
  const openai = getOpenRouter();

  const completion = await openai.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Procesa esta acta de escrutinio y cómputo. Devuelve únicamente el JSON.",
          },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content ?? "{}";

  let extraccion;
  try {
    extraccion = JSON.parse(raw);
  } catch (e) {
    throw new Error(`OCR returned invalid JSON: ${e.message}\nRaw: ${raw.slice(0, 500)}`);
  }

  return {
    extraccion,
    usage: completion.usage || null,
    model: completion.model || model,
  };
}
