import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(), // Menambahkan timestamp
        winston.format.colorize(), // Memberikan warna pada level log
        winston.format.printf(({ level, message, timestamp, context }) => {
          // Menyesuaikan format log
          return `[${timestamp}] [${level}]${context ? ` [${context}]` : ''}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(), // Output ke console
        new winston.transports.File({
          filename: 'logs/application.log', // Simpan log ke file
        }),
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [PrismaService, ValidationService],
  exports: [PrismaService, ValidationService],
})
export class CommonModule {}
