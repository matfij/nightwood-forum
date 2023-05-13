import { EventTopic } from './topics';

export interface SignupEvent {
    topic: EventTopic.Signup;
    data: {
        id: string;
        username: string;
    };
}

export interface SigninEvent {
    topic: EventTopic.Signup;
    data: {
        id: string;
        username: string;
    };
}
