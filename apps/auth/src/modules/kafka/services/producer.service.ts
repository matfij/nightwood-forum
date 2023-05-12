import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ProducerRecord } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { KAFKA_BROKERS } from 'src/common/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: KAFKA_BROKERS,
    });
    private readonly producer = this.kafka.producer();

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }

    async onApplicationShutdown() {
        this.producer.disconnect();
    }
}
