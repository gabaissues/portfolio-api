import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ApiTokenGuard } from './auth/api-guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProjectsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiTokenGuard,
    },
  ],
})
export class AppModule {}
