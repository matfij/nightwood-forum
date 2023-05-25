import { Kafka, Partitioners } from 'kafkajs';
import { BUS_CLIENT_ID, BUS_URL } from '../config';

export async function connectBus() {
    const kafka = new Kafka({
        clientId: BUS_CLIENT_ID,
        brokers: [BUS_URL],
    });

    const producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
    });

    await producer.connect();
    const ack = await producer.send({
        topic: 'topic-test',
        messages: [{ value: 'Test message 1' }],
    });
    console.log(ack);

    await producer.disconnect();
}
