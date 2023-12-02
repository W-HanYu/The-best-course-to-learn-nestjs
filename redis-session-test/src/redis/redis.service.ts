import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  /**
   * 因为我们要操作的是对象结构，比较适合使用 hash。
   *
   */

  /**
   * redis 的 hash 有这些方法：
      - HSET key field value： 设置指定哈希表 key 中字段 field 的值为 value。
      - HGET key field：获取指定哈希表 key 中字段 field 的值。
      - HMSET key field1 value1 field2 value2 ...：同时设置多个字段的值到哈希表 key 中。
      - HMGET key field1 field2 ...：同时获取多个字段的值从哈希表 key 中。
      - HGETALL key：获取哈希表 key 中所有字段和值。
      - HDEL key field1 field2 ...：删除哈希表 key 中一个或多个字段。
      - HEXISTS key field：检查哈希表 key 中是否存在字段 field。
      - HKEYS key：获取哈希表 key 中的所有字段。
      - HVALUES key：获取哈希表 key 中所有的值。 -HLEN key：获取哈希表 key 中字段的数量。
      - HINCRBY key field increment：将哈希表 key 中字段 field 的值增加 increment。
      - HSETNX key field value：只在字段 field 不存在时，设置其值为 value。
   */
  async hashGet(key: string) {
    await this.redisClient.hGetAll(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
