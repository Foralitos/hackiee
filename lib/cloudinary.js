import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfig() {
  if (configured) return;
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      "Missing Cloudinary env vars (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)"
    );
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

// Uploads a Buffer (e.g. from a multipart form) to Cloudinary and returns the
// secure URL + publicId. The folder layout makes it easy to find every acta
// belonging to a given casilla later.
export async function uploadActa(buffer, { casillaId = "unknown" } = {}) {
  ensureConfig();

  const dataUri = `data:application/octet-stream;base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: `prep-copilot/actas/${casillaId}`,
    resource_type: "image",
    // Let Cloudinary pick the best format/quality at delivery time, so the
    // URL we hand to Gemini is small without sacrificing legibility.
    transformation: [{ quality: "auto:good", fetch_format: "auto" }],
  });

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}
