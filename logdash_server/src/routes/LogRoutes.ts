import { Request, Response, Router } from "express";
const router = Router();
import redisClient from "../utils/redis.js";


router.get("/", async (req: Request, res: Response) => {
    const logs: Array<string> | null = await redisClient.get("api_action_log:*") as any;
    res.send(logs);
});


export default router;