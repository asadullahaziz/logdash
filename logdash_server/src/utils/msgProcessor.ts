import { KafkaMessage } from 'kafkajs';
import redisClient from './redis.js';
import { eventEmitter } from './event.js';
import { EVENTS } from '../constants.js';

export async function messageProcessor(data: KafkaMessage) {
    const value = JSON.parse(data.value?.toString("utf-8") as string);
    
    try {
        await redisClient.setEx(`api_action_log:${Date.now()}`, parseInt(process.env.CACHE_EXPIRY as string), JSON.stringify(value));
        eventEmitter.emit(EVENTS.api_action_log_added, value);
    } catch (error) {
        console.error(error);
    }
}