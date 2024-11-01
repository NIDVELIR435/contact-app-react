import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { FirebaseModule } from './database/firebase/firebase.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [ContactsModule, FirebaseModule, ConfigurationModule],
})
export class AppModule {}
