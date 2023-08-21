import { KafkaMessage } from 'kafkajs';
import redisClient from './redis.js';

export async function messageProcessor(data: KafkaMessage) {
    try {
        // process message
    } catch (error) {
        console.error(error);
    }
}