import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

export const reactPath = path.join(__dirName, "..", "..", "React", "dist");

export const indexPath = path.join(reactPath, "index.html");