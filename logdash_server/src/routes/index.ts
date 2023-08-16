// Libs
import { Router } from "express";

const router = Router();

// Modules
import LogRoutes from "./LogRoutes";

// Routes
router.use("/v1/logs", LogRoutes);


export default router;