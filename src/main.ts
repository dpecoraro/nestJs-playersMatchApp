import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilters } from './common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionFilters());
    await app.listen(3000);
}
bootstrap();
