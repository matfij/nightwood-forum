import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { EventProducer } from '../models/event-producer.interface';
import { EventTopic } from '../../../.shared/topics';
import { KafkaProducer } from './kafka.producer';
import { EVENT_BROKERS } from '../../../common/config';
import { Event } from '../../../.shared/events';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
    private readonly producers = new Map<EventTopic, EventProducer>();

    async produce<T extends Event>(event: T) {
        const producer = await this.getProducer(event['topic']);
        await producer.produce({ value: JSON.stringify(event['data']) });
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
