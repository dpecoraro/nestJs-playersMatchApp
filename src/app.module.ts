import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
    imports: [JogadoresModule,
        MongooseModule.forRoot('http://localhost:8001')
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
