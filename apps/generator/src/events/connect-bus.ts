import { Kafka, Partitioners } from 'kafkajs';

export async function connectBus() {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['kafka:9092'],
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
