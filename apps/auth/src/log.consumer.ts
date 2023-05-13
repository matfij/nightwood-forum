import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './modules/events/services/consumer.service';
import { EventTopic } from './.shared/topics';
import { EVENT_LISTENER_GROUP_ID } from './common/config';
import { parseMessage } from './common/utils/parse-message';

@Injectable()
export class LogConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume({
            topics: { topics: [EventTopic.Signin] },
            config: { groupId: EVENT_LISTENER_GROUP_ID },
            onMessage: async (message) => this.onSigninEvent(message),
        });
        await this.consumerService.consume({
            topics: { topics: [EventTopic.Signup] },
            config: { groupId: EVENT_LISTENER_GROUP_ID },
            onMessage: async (message) => this.onSignupEvent(message),
        });
    }

    onSigninEvent(message: any) {
        console.log('signin', parseMessage(message));
    }

    onSignupEvent(message: any) {
        console.log('signup:', parseMessage(message));
    }
}
