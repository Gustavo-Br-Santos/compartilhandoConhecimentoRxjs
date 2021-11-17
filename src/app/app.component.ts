import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observer, range } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { Cliente, Conta } from 'src/model/cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'compartilhandoConhecimentosRxjs';

  observer: Observer<any> = {
    next: (valor:any) => console.log('next:', valor),
    error: (err:Error) => console.log('erro: ', err),
    complete: () => console.log('Completo!')
  }

  constructor(private clienteService: ClienteService){}

  ngOnInit(){
    // Operadore de criação
    //--------------------------------------------------------------------------
    // Of
    // this.clienteService.getCliente().subscribe(this.observer)

    //--------------------------------------------------------------------------
    // From
    const iteravelFrom$ = from([1, 2, 3, 4, 5, 6])

    // iteravelFrom$.subscribe(this.observer)

    //--------------------------------------------------------------------------
    // FromEvent
    const fromEvent$ = fromEvent(document, 'scroll')

    // fromEvent$.subscribe(this.observer)

    //--------------------------------------------------------------------------
    // Interval
    const interval$ = interval(500)

    // interval$.subscribe(this.observer)

    //--------------------------------------------------------------------------
    //Range
    const range$ = range(1, 5)
    // range$.subscribe(this.observer)

    //--------------------------------------------------------------------------
    // Operadores canalizaveis

    // map, tap
    this.clienteService.getCliente().pipe(
      tap(val => console.log('tap antes do map: ', val)),
      map<Cliente, Conta>(cliente => ({
        agencia: cliente.agencia,
        conta: cliente.conta,
        dac: cliente.dac
      })),
      tap(val => console.log('tap depois do map: ', val)),
    )
    // .subscribe(this.observer)

    //--------------------------------------------------------------------------
    // filter
    interval$.pipe(
      filter(valor => valor % 2 === 0)
    )
    // .subscribe(this.observer)

    //--------------------------------------------------------------------------
    //distinctUntilChange
    const input = document.getElementById('input') as HTMLInputElement;
    const input$ = fromEvent<KeyboardEvent>(input, 'keyup')

    input$.pipe(
      debounceTime(2000),
      map(event => event.key),
      distinctUntilChanged()
    )
    .subscribe(this.observer)

  }
}
