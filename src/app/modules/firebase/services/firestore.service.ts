import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  get now() {
    return firebase.default.firestore.Timestamp.now()
  }
  
  get root() {
    return this.firestore.collection('apps').doc('wk-technology-test-angular')
  }
}
