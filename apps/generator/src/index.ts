import express from "express";
import { Kafka, Partitioners } from "kafkajs";

const app = express();
const port = 13000;

app.get("/", (req, res) => {
  res.send("Generator started");
});

async function connectKafka() {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka:9092"],
  });

  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  await producer.connect();
  const ack = await producer.send({
    topic: "topic-test",
    messages: [{ value: "Test message 1" }],
  });
  console.log(ack);

  await producer.disconnect();
}

app.listen(port, () => {
  console.log(`Generator app listening on port ${port}.`);
  connectKafka();
});
