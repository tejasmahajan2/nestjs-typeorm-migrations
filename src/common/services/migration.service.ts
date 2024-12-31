import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dataSourceConfig } from 'src/config/typeorm.config';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationService {
    private dataSource: DataSource;
    private logger = new Logger(MigrationService.name);

    constructor(private readonly configService: ConfigService) {
        this.dataSource = new DataSource(dataSourceConfig(this.configService));
    }

    async initializeDataSource() {
        try {
            await this.dataSource.initialize();
            this.logger.log('DataSource initialized for migrations.');
        } catch (error) {
            console.error(error);
            this.logger.error('Error during migration dataSource initialization.');
        }
    }
}
