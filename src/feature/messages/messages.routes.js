import { controllersMessages } from "./messages.controller.js";
import express from "express";

const router = express.Router();

// eid = id del emisor
// rid = id del receptor

router.post("/:mid", controllersMessages.postMessage);
router.get("/:mid", controllersMessages.getMessages);
router.delete("/:mid", controllersMessages.deleteMessage);
router.put("/:mid", controllersMessages.putMessage);

export default router;
