import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public clientsCollection!: AngularFirestoreCollection<Client>;
  public clientDoc!: AngularFirestoreDocument<Client>;
  public clients!: Observable<Client[]>;
  public client!: Observable<Client | null>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  public getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        })
      )
    );
    return this.clients;
  }

  public newClient(req: Client) {
    this.clientsCollection.add(req);
  }

  public getClient(id: string): Observable<Client | null> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  public updateClient(client: Client) {
    console.log(client);
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    console.log(this.clientDoc);
    this.clientDoc.update(client);
  }

  public deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
