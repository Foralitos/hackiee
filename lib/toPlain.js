// Convert any value (typically a Mongoose document with populated subdocs)
// into a fully plain object suitable for crossing the Server → Client Component
// boundary. JSON.parse(JSON.stringify(...)) recursively invokes every toJSON
// and strips ObjectIds, Dates, and other non-serializable methods that Next.js
// refuses to pass through RSC props.
export default function toPlain(value) {
  return JSON.parse(JSON.stringify(value));
}
