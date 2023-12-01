import { Redis } from "ioredis";

const redis = new Redis();

const res = await redis.keys("*");

console.log(res);

