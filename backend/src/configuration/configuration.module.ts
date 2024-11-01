import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigKeyEnum } from './config-key.enum';
import firebaseConfig from './configs/firebase.config';
import appConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({ [ConfigKeyEnum.firebase]: firebaseConfig() }),
        () => ({ [ConfigKeyEnum.app]: appConfig() }),
      ],
    }),
  ],
})
export class ConfigurationModule {}
