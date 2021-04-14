import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { FirestoreService } from '../../firebase/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: FirestoreService) { }

  private ref = this.firestore.root.collection<Order>('orders')

  async create(model: Order) {
    try {
      const ref = await this.firestore.root.collection<Order>('orders').add(model)
      await ref.update({ id: ref.id })
      model.id = ref.id
      return Promise.resolve(model)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  
  list(): Observable<Order[]> {
    return this.ref.valueChanges()
  }
}
