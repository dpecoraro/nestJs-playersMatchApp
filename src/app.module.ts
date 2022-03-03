import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

@Module({
    imports: [JogadoresModule,
        MongooseModule.forRoot('http://localhost:8001'),
        CategoriesModule,
        AuthModule,
        AwsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
