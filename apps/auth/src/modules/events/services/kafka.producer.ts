import { Kafka, Message, Producer } from 'kafkajs';
import { Logger } from '@nestjs/common';
import { EventProducer } from '../models/event-producer.interface';
import { sleep } from '../../../common/utils/sleep';
import { EventTopic } from '../../../.shared/topics';

export class KafkaProducer implements EventProducer {
    private readonly kafka: Kafka;
    private readonly producer: Producer;
    private readonly logger: Logger;

    constructor(private readonly topic: EventTopic, brokers: string[]) {
        this.kafka = new Kafka({
            brokers: brokers,
        });
        this.producer = this.kafka.producer();
        this.logger = new Logger(topic);
    }

    async connect() {
        try {
            await this.producer.connect();
        } catch (error) {
            this.logger.error(error);
            await sleep(1000);
            this.connect();
        }
    }

    async produce(message: Message) {
        await this.producer.send({ topic: this.topic, messages: [message] });
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}
