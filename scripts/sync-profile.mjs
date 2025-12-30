import fs from "node:fs/promises"
import path from "node:path"

const ADMIN_API_BASE = process.env.ADMIN_API_BASE || "http://localhost:8000"
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ""

const OUT_FILE = path.resolve("src/data/profile.json")
const url = `${ADMIN_API_BASE.replace(/\/$/, "")}/api/portfolio/export`

const res = await fetch(url, {
  headers: ADMIN_TOKEN ? { Authorization: `Bearer ${ADMIN_TOKEN}` } : undefined
})

if (!res.ok) {
  console.error("Sync failed:", res.status, await res.text())
  process.exit(1)
}

const json = await res.json()
await fs.writeFile(OUT_FILE, JSON.stringify(json, null, 2), "utf8")
console.log("✅ Saved", OUT_FILE)
