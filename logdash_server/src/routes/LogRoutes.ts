import { Request, Response, Router } from "express";

const router = Router();


router.get("/logs", async (req: Request, res: Response) => {
    res.send([]);
});


export default router;