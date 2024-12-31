import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dataSourceConfig } from 'src/config/typeorm.config';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationService {
    private dataSource: DataSource;

    constructor(private readonly configService: ConfigService) {
        this.dataSource = new DataSource(dataSourceConfig(this.configService));
    }

    async initializeDataSource() {
        try {
            await this.dataSource.initialize();
            console.log('DataSource initialized for migrations');
        } catch (error) {
            console.error('Error during migration dataSource initialization', error);
        }
    }
}
