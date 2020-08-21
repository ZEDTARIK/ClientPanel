import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCol: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientCol = this.afs.collection('Clients');
  }

  getClients(): Observable<Client[]> {
    return this.clientCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  newClient(client: Client){
    this.clientCol.add(client);
  }
}
