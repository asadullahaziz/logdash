import { KafkaMessage } from 'kafkajs'

export async function messageProcessor(data: KafkaMessage) {
    try {
        // process message
    } catch (error) {
        // log error
    }
}