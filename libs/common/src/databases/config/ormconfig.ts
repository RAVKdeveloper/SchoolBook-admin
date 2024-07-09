import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'

export class TypeOrmConfigClass {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.get('host'),
      port: config.get('dbport'),
      username: config.get('dblogin'),
      password: config.get('password'),
      database: config.get('dbname'),
      entities: ['dist/src/*/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      url: process.env.URI,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => {
    return TypeOrmConfigClass.getOrmConfig(configservice)
  },
  inject: [ConfigService],
}
