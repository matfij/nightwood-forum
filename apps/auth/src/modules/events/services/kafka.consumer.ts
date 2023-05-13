import { Consumer, Kafka, ConsumerSubscribeTopics, ConsumerConfig, KafkaMessage } from 'kafkajs';
import { Logger } from '@nestjs/common';
import { sleep } from 'src/common/utils/sleep';
import { EventConsumer } from '../models/event-consumer.interface';

export class KafkaConsumer implements EventConsumer {
    private readonly kafka: Kafka;
    private readonly consumer: Consumer;
    private readonly logger: Logger;

    constructor(private readonly topics: ConsumerSubscribeTopics, private config: ConsumerConfig, brokers: string[]) {
        this.kafka = new Kafka({ brokers: brokers });
        this.consumer = this.kafka.consumer(config);
        this.logger = new Logger(`${topics.topics[0]}-${config.groupId}`);
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
            eachMessage: async ({ topic, message, partition }) => {
                onMessage(message);
            },
        });
    }

    async disconnect() {
        await this.consumer.disconnect();
    }
}
