import { createClient } from "redis";

const redisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    password: process.env.REDIS_PASSWORD
}

const redisClient = createClient({ url: `redis://:${redisOptions.password}@${redisOptions.host}:${redisOptions.port}` });

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

redisClient.on("error", (error) => {
    console.error("Redis Error: ", error);
});

await redisClient.connect();

export default redisClient;