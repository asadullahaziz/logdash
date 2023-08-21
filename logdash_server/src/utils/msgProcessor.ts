import { KafkaMessage } from 'kafkajs';
import redisClient from './redis.js';

export async function messageProcessor(data: KafkaMessage) {
    try {
        await redisClient.setEx(`api_action_log:${Date.now()}`, parseInt(process.env.CACHE_EXPIRY as string), JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}