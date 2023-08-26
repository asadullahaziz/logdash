import KafkaConsumer from "./kafkaConsumer.js";
import { messageProcessor } from "./msgProcessor.js";


export default new KafkaConsumer(
    messageProcessor,
    process.env.KAFKA_HOST as string,
    process.env.LOGDASH_KAFKA_CLIENT_ID as string,
    process.env.LOGDASH_KAFKA_GROUP_ID as string,
    [process.env.KAFKA_LOGDASH_TOPIC as string]
);