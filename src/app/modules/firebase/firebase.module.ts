import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FirestoreService } from './services/firestore.service';

@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    AngularFirestoreModule,
  ],
  providers: [
    FirestoreService,
  ]
})
export class FirebaseModule { }
