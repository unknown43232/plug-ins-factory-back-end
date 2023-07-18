import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service'; // Make sure to import AppService

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // replace with your secret
      signOptions: { expiresIn: '60s' }, // customize as needed
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService], // Add AppService to the providers array
})
export class AppModule {}
