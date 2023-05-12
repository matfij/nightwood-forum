import { Topics } from './topics';

export interface SignupEvent {
    topic: Topics.Signup;
    data: {
        id: string;
        username: string;
    };
}

export interface SigninEvent {
    topic: Topics.Signup;
    data: {
        id: string;
        username: string;
    };
}
