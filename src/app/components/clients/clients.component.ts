import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[];
  total : number;
  constructor(private clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getClients()
    .subscribe(data =>{
      this.clients = data;
      this.total = this.getTotalBalance();
    });
  }

  getTotalBalance() {
    return this.clients.reduce((total, clients) => {
        return total + clients.balance;
    } , 0)
  }

}
