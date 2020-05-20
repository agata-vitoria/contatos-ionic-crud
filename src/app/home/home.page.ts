import { Component } from '@angular/core';
import { Contato } from 'src/modelos/contato';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contatos: Contato[];
  public newContato: Contato = <Contato>{};
  public resp: any;
  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://mobetec.000webhostapp.com/ContatoApi/v1/Api.php?apicall=';
    this.lerContato();
  }

  lerContato() {
    this.http.get(this.url + 'getcontatos')
      .subscribe((response) => {
        this.resp = response;
        this.contatos = this.resp.contatos;
      });
  }

  incluirContato() {
    let param = new HttpParams()
      .set('nome', String(this.newContato.nome))
      .set('telefone', String(this.newContato.telefone))
      .set('nota', String(this.newContato.nota))
      .set('tipo', String(this.newContato.tipo));

    this.http.post(this.url + 'createcontato', param)
      .subscribe((response) => {
        this.lerContato();
      })
  }

  deletarContato(contatosel: Contato) {
    this.http.get(this.url + 'deletecontato&id=' + contatosel.id)
    .subscribe((response) => {
      this.lerContato();
    })
  }

  atualizarContato(contatosel: Contato) {
    let param = new HttpParams()
    .set('id', contatosel.id.toString())
    .set('nome', String(this.newContato.nome))
    .set('telefone', String(this.newContato.telefone))
    .set('nota', String(this.newContato.nota))
    .set('tipo', String(this.newContato.tipo));

    this.http.post(this.url + 'updatecontato', param).subscribe((response) => {
      this.lerContato();
    })
  }
}



