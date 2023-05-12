import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerRunConfig, ConsumerSubscribeTopics } from '@nestjs/microservices/external/kafka.interface';
import { Consumer, Kafka } from 'kafkajs';
import { KAFKA_BROKERS, KAFKA_LISTENER_GROUP_ID } from 'src/common/config';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: KAFKA_BROKERS,
    });
    private readonly consumers: Consumer[] = [];

    async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: KAFKA_LISTENER_GROUP_ID });
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}
