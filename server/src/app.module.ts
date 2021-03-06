import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorInterceptor, TransformResInterceptor } from './interceptors';
import { MilvusModule } from './milvus/milvus.module';
import { CollectionsModule } from './collections/collections.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PartitionsModule } from './partitions/partitions.module';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      renderPath: '/', // only root render static html
    }),
    MilvusModule,
    CollectionsModule,
    UsersModule,
    AuthModule,
    PartitionsModule,
    SchemaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResInterceptor,
    },
    UsersService,
  ],
})
export class AppModule {}
