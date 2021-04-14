import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { FirestoreService } from '../../firebase/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: FirestoreService) { }

  private ref = this.firestore.root.collection<Product>('products')

  async create(model: Product) {
    try {
      const ref = await this.firestore.root.collection<Product>('products').add(model)
      await ref.update({ id: ref.id })
      model.id = ref.id
      return Promise.resolve(model)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  
  list(): Observable<Product[]> {
    return this.ref.valueChanges()
  }
}
