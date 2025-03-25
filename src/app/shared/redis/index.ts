import { createClient } from "redis";

export type RedisTypeClient = ReturnType<typeof createClient>

export class CreateConnectionRedis {
  protected client: RedisTypeClient;

  constructor() {
    this.client = this.createClient()
  }

  public async setValue(key: string, value: string) {
    return this.client.set(key, value)
  }

  public async getValue(key: string) {
    return this.client.get(key)
  }

  private createClient() {
    try {
      const client = createClient({
        url: process.env.REDIS_URL
      })

      client.connect().catch((err) => {
        console.error("Erro ao conectar ao Redis:", err);
        throw new Error("Falha ao conectar ao Redis: " + err.message);
      });

      return client
    }catch (err){
      console.error("Erro ao criar cliente Redis:", err);
      throw new Error('Redis client error ' + err)
    }
  }
 }
