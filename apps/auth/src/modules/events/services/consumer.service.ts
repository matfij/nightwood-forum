import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { KafkaConsumerOptions } from '../models/kafka-consumer-options.interface';
import { KafkaConsumer } from './kafka.consumer';
import { EventConsumer } from '../models/event-consumer.interface';
import { EVENT_BROKERS } from 'src/common/config';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly consumers: EventConsumer[] = [];

    async consume(options: KafkaConsumerOptions) {
        const consumer = new KafkaConsumer(options.topics, options.config, EVENT_BROKERS);
        await consumer.connect();
        await consumer.consume(options.onMessage);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}
