import { createClient } from "redis";

const redisOptions = {
    host: "redis",
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
}

const redisClient = createClient(redisOptions);

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

redisClient.on("error", (error) => {
    console.error("Redis Error: ", error);
});

await redisClient.connect();

export default redisClient;