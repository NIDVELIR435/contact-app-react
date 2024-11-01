import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { FirebaseModule } from '../database/firebase/firebase.module';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [FirebaseModule],
})
export class ContactsModule {}
