import { Request, Response, Router } from "express";
const router = Router();
import redisClient from "../utils/redis.js";
import { eventEmitter } from "../utils/event.js";
import { EVENTS } from "../constants.js";

// Get all API action logs from cache
router.get("/", async (req: Request, res: Response) => {
    const logs: Array<string> | null = await redisClient.get("api_action_log:*") as any;
    res.send(logs);
});

// Server Sent Events (SSE) API handler for getting live API action logs
router.get("/live", async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Event source instance for the client
    const clientEventSource = res;

    // Register event listener for the api action log added event
    eventEmitter.on(EVENTS.api_action_log_added, (data: string) => {
        clientEventSource.write(`data: ${data}\n\n`);
    });

    // Handle SSE connection close
    req.on("close", () => {
        eventEmitter.removeAllListeners(EVENTS.api_action_log_added);
    });
});


export default router;