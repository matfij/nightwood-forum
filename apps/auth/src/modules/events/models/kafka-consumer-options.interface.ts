import { ConsumerConfig, ConsumerSubscribeTopics, KafkaMessage } from 'kafkajs';

export interface KafkaConsumerOptions {
    topics: ConsumerSubscribeTopics;
    config: ConsumerConfig;
    onMessage: (message: KafkaMessage) => Promise<void>;
}
