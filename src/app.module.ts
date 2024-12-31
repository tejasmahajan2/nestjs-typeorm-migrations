import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig, typeOrmConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly dataSource: DataSource;
  constructor(private readonly configService: ConfigService) {
    this.dataSource = new DataSource(dataSourceConfig(this.configService))
  }

  async onModuleInit() {
    try {
      await this.dataSource.initialize();
      console.log('DataSource initialized for migrations');
    } catch (error) {
      console.error('Error during migration dataSource initialization', error);
    }
  }
}
