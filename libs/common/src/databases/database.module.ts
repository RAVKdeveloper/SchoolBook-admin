import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import configuration from './config/default.config'
import { typeOrmConfig } from './config/ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (config) => {
    //     const store = await redisStore({
    //       socket: {
    //         host: config.get('redis.host'),
    //         port: config.get('redis.port'),
    //       },
    //       ttl: 10000,
    //     });

    //     return { store, ttl: 10000 };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
})
export class DatabaseModule {}
