import { Service } from 'egg';

export default class CacheService extends Service {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param value 缓存值
   * @param ttl 过期时间（秒）
   */
  async set(key: string, value: any, ttl?: number) {
    const { app } = this;
    const stringValue = JSON.stringify(value);
    
    if (ttl) {
      await app.redis.setex(key, ttl, stringValue);
    } else {
      await app.redis.set(key, stringValue);
    }
  }

  /**
   * 获取缓存
   * @param key 缓存键
   */
  async get(key: string) {
    const { app } = this;
    const stringValue = await app.redis.get(key);
    
    if (stringValue) {
      return JSON.parse(stringValue);
    }
    
    return null;
  }

  /**
   * 删除缓存
   * @param key 缓存键
   */
  async del(key: string) {
    const { app } = this;
    await app.redis.del(key);
  }

  /**
   * 设置哈希缓存
   * @param key 缓存键
   * @param field 字段名
   * @param value 字段值
   */
  async hset(key: string, field: string, value: any) {
    const { app } = this;
    const stringValue = JSON.stringify(value);
    await app.redis.hset(key, field, stringValue);
  }

  /**
   * 获取哈希缓存
   * @param key 缓存键
   * @param field 字段名
   */
  async hget(key: string, field: string) {
    const { app } = this;
    const stringValue = await app.redis.hget(key, field);
    
    if (stringValue) {
      return JSON.parse(stringValue);
    }
    
    return null;
  }

  /**
   * 删除哈希缓存字段
   * @param key 缓存键
   * @param field 字段名
   */
  async hdel(key: string, field: string) {
    const { app } = this;
    await app.redis.hdel(key, field);
  }

  /**
   * 获取哈希缓存所有字段
   * @param key 缓存键
   */
  async hgetall(key: string) {
    const { app } = this;
    const result = await app.redis.hgetall(key);
    
    const parsedResult: Record<string, any> = {};
    for (const [key, value] of Object.entries(result)) {
      parsedResult[key] = JSON.parse(value);
    }
    
    return parsedResult;
  }
}