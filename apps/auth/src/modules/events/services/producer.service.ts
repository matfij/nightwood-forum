import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { EventProducer } from '../models/event-producer.interface';
import { EventTopic } from '../../../.shared/topics';
import { KafkaProducer } from './kafka.producer';
import { EVENT_BROKERS } from 'src/common/config';
import { Message } from 'kafkajs';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
    private readonly producers = new Map<EventTopic, EventProducer>();

    async produce(topic: EventTopic, message: Message) {
        const producer = await this.getProducer(topic);
        await producer.produce(message);
    }

    private async getProducer(topic: EventTopic) {
        let producer = this.producers.get(topic);
        if (!producer) {
            producer = new KafkaProducer(topic, EVENT_BROKERS);
            await producer.connect();
            this.producers.set(topic, producer);
        }
        return producer;
    }

    async onApplicationShutdown() {
        for (const producer of this.producers.values()) {
            await producer.disconnect();
        }
    }
}
