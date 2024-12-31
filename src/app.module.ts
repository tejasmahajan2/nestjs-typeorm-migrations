import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MigrationService } from './common/services/migration.service';

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
  providers: [AppService, MigrationService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly migrationService: MigrationService) { }

  async onModuleInit() {
    await this.migrationService.initializeDataSource();
  }
}
