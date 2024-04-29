import express from "express";
import * as paths from "../utils/paths.js";

const router = express.Router();

router.get("/*", (req, res) => {
    res.sendFile(paths.indexPath);
});

export default router;