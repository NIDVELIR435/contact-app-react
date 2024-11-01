import { Injectable, Logger } from '@nestjs/common';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyEnum } from '../../configuration/config-key.enum';
import { FirebaseConfig } from '../../configuration/configs/firebase.config';
import { credential, firestore, ServiceAccount } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

@Injectable()
export class FirebaseService {
  private logger = new Logger(FirebaseService.name);
  public db: FirebaseFirestore.Firestore;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.getOrThrow<FirebaseConfig>(
      ConfigKeyEnum.firebase,
    );

    const firebaseConfig: ServiceAccount = {
      projectId: config.project_id,
      clientEmail: config.client_email,
      privateKey: config.private_key,
    };

    const app = initializeApp({
      credential: credential.cert(firebaseConfig),
      databaseURL: `https://${config.project_id}.firebaseio.com`,
    });
    this.db = getFirestore(app);
  }

  async getContacts(collectionName: string) {
    // todo should be dto outside this service
    function normalizeData(id, name, email, phone) {
      return { id, name: name ?? '', email: email ?? '', phone: phone ?? '' };
    }
    return this.db
      .collection(collectionName)
      .get()
      .then((a) =>
        a.docs.map((doc) => {
          const mainData = doc.data();

          return normalizeData(
            doc.id,
            mainData.name,
            mainData.email,
            mainData.phone,
          );
        }),
      );
  }

  async addContact(collectionName: string, contact: any) {
    try {
      const docRef = await this.db.collection(collectionName).add(contact);
      return { id: docRef.id, ...contact };
    } catch (error) {
      this.logger.error('Error adding contact:', error);
      throw error;
    }
  }

  async getContact(collectionName: string, contactId: string) {
    const docRef = this.db.collection(collectionName).doc(contactId);

    try {
      const doc = await docRef.get();
      if (!doc.exists) {
        this.logger.warn(`Contact with ID: ${contactId} not found.`);
        return null;
      }
      this.logger.log(`Fetched contact with ID: ${contactId}.`);
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      this.logger.error(`Error fetching contact with ID: ${contactId}`, error);
      throw new Error('Failed to fetch contact!');
    }
  }

  async updateContact(
    collectionName: string,
    contactId: string,
    updatedData: Partial<DocumentData>,
  ): Promise<void> {
    const docRef = this.db.collection(collectionName).doc(contactId);

    try {
      const doc = await docRef.get();
      if (!doc.exists) {
        this.logger.warn(`Contact with ID: ${contactId} not found.`);
        throw new Error('Contact not found.');
      }

      await docRef.update(updatedData);
      this.logger.log(`Contact with ID: ${contactId} updated successfully.`);
    } catch (error) {
      this.logger.error(`Error updating contact with ID: ${contactId}`, error);
      throw new Error('Failed to update contact!');
    }
  }

  async deleteContact(collectionName: string, id: string): Promise<void> {
    const docRef = this.db.collection(collectionName).doc(id);

    try {
      await docRef.delete();
      this.logger.log(`Contact with ID: ${id} deleted successfully.`);
    } catch (error) {
      this.logger.error(`Error deleting contact with ID: ${id}`, error);
      throw new Error('Cannot delete contact!');
    }
  }
}
