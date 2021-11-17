import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { clienteMock } from 'src/mock/apiMock';
import { Cliente } from 'src/model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getCliente():Observable<Cliente>{
    return of(clienteMock)
  }
}
