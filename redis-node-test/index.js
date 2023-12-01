import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (err) => console.log("Redis Client err", err));

await client.connect();

await client.hSet("taotao", "111", "value111");
await client.hSet("taotao", "222", "value222");
await client.hSet("taotao", "333", "value333");


const value = await client.keys("*");

console.log(value);

await client.disconnect();

