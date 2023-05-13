import { EventTopic } from './topics';

export interface Event {
    topic: EventTopic;
    data: any;
}

export interface SignupEvent {
    topic: EventTopic.Signup;
    data: {
        id: string;
        username: string;
    };
}

export interface SigninEvent {
    topic: EventTopic.Signin;
    data: {
        id: string;
        username: string;
    };
}
