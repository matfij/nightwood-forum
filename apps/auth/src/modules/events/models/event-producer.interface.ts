export interface EventProducer {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    produce: (messge: any) => Promise<void>;
}
