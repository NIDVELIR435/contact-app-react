import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FirebaseService } from '../database/firebase/firebase.service';

@Injectable()
export class ContactsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async create(createContactDto: CreateContactDto): Promise<void> {
    await this.firebaseService.addContact('contacts', createContactDto);
  }

  public findAll() {
    return this.firebaseService.getContacts('contacts');
  }

  public findOne(id: string) {
    return this.firebaseService.getContact('contacts', id);
  }

  public async update(id: string, updateContactDto: UpdateContactDto) {
    await this.firebaseService.updateContact('contacts', id, updateContactDto);
  }

  public async remove(id: string) {
    await this.firebaseService.deleteContact('contacts', id);
  }
}
