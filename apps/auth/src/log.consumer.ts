import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './modules/events/services/consumer.service';
import { EventTopic } from './.shared/topics';
import { parseMessage } from './common/utils/parse-message';
import { EVENT_LISTENER_GROUP_ID } from './common/config';
import { SigninEvent, SignupEvent } from './.shared/events';

@Injectable()
export class LogConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        // await this.consumerService.consume({
        //     topics: { topics: [EventTopic.Signin] },
        //     config: { groupId: `${EVENT_LISTENER_GROUP_ID}-${EventTopic.Signin}` },
        //     onMessage: async (message) => this.onSigninEvent(message),
        // });
        // await this.consumerService.consume({
        //     topics: { topics: [EventTopic.Signup] },
        //     config: { groupId: `${EVENT_LISTENER_GROUP_ID}-${EventTopic.Signup}` },
        //     onMessage: async (message) => this.onSignupEvent(message),
        // });
    }

    onSigninEvent(message: any) {
        const data = parseMessage<SigninEvent['data']>(message);
        console.log('signin:', data);
    }

    onSignupEvent(message: any) {
        const data = parseMessage<SignupEvent['data']>(message);
        console.log('signup:', data);
    }
}
