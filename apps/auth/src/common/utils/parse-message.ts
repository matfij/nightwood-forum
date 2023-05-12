import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

export const parseMessage = <T>(message: KafkaMessage): T => {
    return JSON.parse(message.value.toString()) as T;
};
