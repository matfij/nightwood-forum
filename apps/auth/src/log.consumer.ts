import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './modules/kafka/services/consumer.service';
import { parseMessage } from './common/utils/parse-message';
import { Topics } from './.shared/topics';
import { SignupEvent } from './.shared/events';

@Injectable()
export class LogConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume(
            { topics: [Topics.Signin] },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log({
                        topic: topic,
                        partition: partition,
                        value: parseMessage<SignupEvent['data']>(message),
                    });
                },
            },
        );
    }
}
