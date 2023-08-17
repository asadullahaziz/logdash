import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload } from 'kafkajs'
import { MessageProcessor } from '../types';

export default class KafkaConsumer {
    private kafkaConsumer: Consumer;
    private messageProcessor: MessageProcessor;
    private topics: Array<string>;
    private host: string;
    private clientId: string;
    private groupId: string

    public constructor(messageProcessor: MessageProcessor, host: string, clientId: string, groupId: string, topics: Array<string>) {
        this.messageProcessor = messageProcessor;
        this.kafkaConsumer = this.createKafkaConsumer();
        this.host = host;
        this.clientId = clientId;
        this.groupId = groupId;
        this.topics = topics;
    }

    public async startConsumer(): Promise<void> {
        const topic: ConsumerSubscribeTopics = {
            topics: this.topics,
            fromBeginning: false
        }

        try {
            await this.kafkaConsumer.connect()
            await this.kafkaConsumer.subscribe(topic)

            await this.kafkaConsumer.run({
                eachMessage: async (messagePayload: EachMessagePayload) => {
                    const { topic, partition, message } = messagePayload
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    console.log(`- ${prefix} ${message.key}#${message.value}`)
                }
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    public async startBatchConsumer(): Promise<void> {
        const topic: ConsumerSubscribeTopics = {
            topics: this.topics,
            fromBeginning: false
        }

        try {
            await this.kafkaConsumer.connect()
            await this.kafkaConsumer.subscribe(topic)
            await this.kafkaConsumer.run({
                eachBatch: async (eachBatchPayload: EachBatchPayload) => {
                    const { batch } = eachBatchPayload
                    for (const message of batch.messages) {
                        const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
                        console.log(`- ${prefix} ${message.key}#${message.value}`)
                    }
                }
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    public async shutdown(): Promise<void> {
        await this.kafkaConsumer.disconnect()
    }

    private createKafkaConsumer(): Consumer {
        const kafka = new Kafka({
            clientId: this.clientId,
            brokers: [this.host]
        })
        const consumer = kafka.consumer({ groupId: this.groupId })
        return consumer
    }
}