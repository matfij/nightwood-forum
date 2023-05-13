import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

export const parseMessage = <T>(message: KafkaMessage): T | string => {
    try {
        return JSON.parse(message.value.toString()) as T;
    } catch (err) {
        return message.value.toString();
    }
};
