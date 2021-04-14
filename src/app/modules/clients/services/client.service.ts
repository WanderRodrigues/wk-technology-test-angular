import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client';
import { FirestoreService } from '../../firebase/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: FirestoreService) { }

  private ref = this.firestore.root.collection<Client>('clients')

  async create(model: Client) {
    try {
      const ref = await this.firestore.root.collection<Client>('clients').add(model)
      await ref.update({ id: ref.id })
      model.id = ref.id
      return Promise.resolve(model)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  
  list(): Observable<Client[]> {
    return this.ref.valueChanges()
  }
}
