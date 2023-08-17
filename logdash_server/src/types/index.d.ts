import { KafkaMessage } from 'kafkajs'

export type MessageProcessor = (data: KafkaMessage) => Promise<void>