import { Consumer, Kafka, ConsumerSubscribeTopics, ConsumerConfig, KafkaMessage } from 'kafkajs';
import { sleep } from '../../../common/utils/sleep';
import { EventConsumer } from '../models/event-consumer.interface';

export class KafkaConsumer implements EventConsumer {
    private readonly kafka: Kafka;
    private readonly consumer: Consumer;

    constructor(private readonly topics: ConsumerSubscribeTopics, config: ConsumerConfig, brokers: string[]) {
        this.kafka = new Kafka({ brokers: brokers });
        this.consumer = this.kafka.consumer(config);
    }

    async connect() {
        try {
            await this.consumer.connect();
        } catch (error) {
            await sleep(1000);
            this.connect();
        }
    }

    async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
        await this.consumer.subscribe(this.topics);
        await this.consumer.run({
            eachMessage: async ({ message }) => onMessage(message),
        });
    }

    async disconnect() {
        await this.consumer.disconnect();
    }
}
