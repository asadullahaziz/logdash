import { Request, Response, Router } from "express";
const router = Router();
import redisClient from "../utils/redis.js";
import { eventEmitter } from "../utils/event.js";
import { EVENTS } from "../constants.js";

// Get all API action logs from cache
router.get("/", async (req: Request, res: Response) => {
    const logs: Array<string> = [];

    for await (const key of redisClient.scanIterator({ MATCH: "api_action_log:*" })) {
        const value = await redisClient.get(key) as string;
        logs.push(value);
    }

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