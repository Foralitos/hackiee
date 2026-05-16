// Standalone OCR test: takes a local image file, uploads it to Cloudinary,
// runs the OCR pipeline (extract → validate → classify) and prints the result.
//
// Usage:
//   node --env-file=.env.local scripts/test-ocr.js test-data/actas/acta-1.jpg
//
// Requires: OPENROUTER_API_KEY, CLOUDINARY_*. Does NOT touch MongoDB.

import fs from "node:fs/promises";
import path from "node:path";
import { uploadActa } from "../lib/cloudinary.js";
import { extraerActa } from "../lib/ocr.js";
import { validarActa } from "../lib/validador.js";
import { clasificar } from "../lib/clasificador.js";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/test-ocr.js <image-path>");
  process.exit(1);
}

const abs = path.resolve(file);
const buffer = await fs.readFile(abs);

console.log(`→ Subiendo ${path.basename(abs)} a Cloudinary…`);
const imagen = await uploadActa(buffer, { casillaId: "test" });
console.log(`  ${imagen.secureUrl}\n`);

console.log("→ Llamando OCR (OpenRouter)…");
const { extraccion, usage, model } = await extraerActa(imagen.secureUrl);
console.log(`  modelo: ${model}`);
console.log(`  usage:  ${JSON.stringify(usage)}\n`);

console.log("→ Extracción:");
console.log(JSON.stringify(extraccion, null, 2));
console.log();

console.log("→ Validación determinista:");
const validacion = validarActa(extraccion);
console.log(JSON.stringify(validacion, null, 2));
console.log();

console.log("→ Clasificación:");
console.log(JSON.stringify(clasificar(extraccion, validacion), null, 2));
