import { lineReader } from '../../line-reader'
import { fetchQuery } from '../../request-manager'
//import { configuration } from '../../config/config'
import { Server } from '../server'
import { routerV1 as routerclient } from '../../routers/client-router'

class ClientServer extends Server {
  constructor () {
    super(3002)
    super.routers(routerclient)
    this.header = 'MENU RESTAURANTE FISH'
    this.footer = 'GRACIAS'
    this.oHeader = '******************   PEDIDO   ******************'
    this.oFooter = '******************    FIN     ******************'
    this.divider = '****************'
    this.reqAns = '************* Esperando  respuesta **************'
    this.msn = 'Elija una opción: \n'
    this.address = 'Ingrese su dirección: '
    this.menuOptions = {
      C0101: [50, 'Tamales'],
      C0102: [75, 'Chuchitos'],
      C0103: [15, 'Atol de Elote'],
      C0104: [50, 'Arroz en leche'],
      C0105: [36, 'Tostadas '],
      C0106: [99, 'Chuchitos de chipilin'],
      C0107: [50, 'Tacos'],
      C0108: [75, 'Shucos'],
      C0109: [15, 'Caldo de Gallina'],
      C0110: [50, 'Churrasco'],
      C0111: [36, 'Pepian']
    }
    this.orderinfo = {}
  }

  async placeOrder () {
    const data = await fetchQuery('http://127.0.0.1:3003/accept', 'POST', this.orderinfo)
    console.log(`Orden Enviada a Recepcion: Numero de Pedido: ${data.id}`)
  }

  async placeOrderMoto () {
    const data = await fetchQuery('http://127.0.0.1:3004/accept', 'POST', this.orderinfo)
    console.log(`Orden Enviada a Motoristas: Numero de Pedido: ${data.id}`)
  }

  printOrder () {
    console.log(this.oHeader)
    Object.keys(this.orderinfo).forEach(el => {
      const arrEl = this.menuOptions[el]
      console.log(arrEl[1], arrEl[0] * this.orderinfo[el])
    })
    console.log(this.oFooter)
  }

  async showMenu () {
    console.log(this.divider)
    console.log(0, 'Terminar orden')
    Object.keys(this.menuOptions).forEach((el, idx) => console.log(idx + 1, this.menuOptions[el][1], this.menuOptions[el][0]))
    console.log(this.divider)
  }

  async saveData () {
    let option = -1
    const max = Object.keys(this.menuOptions).length
    while ((option = await lineReader.askNumericQuestion(this.msn)) !== 0) {
      if (option > max || option < 0) { console.log('Opción inválida'); continue }

      const key = Object.keys(this.menuOptions)[option - 1]
      if (Object.keys(this.orderinfo).includes(key)) {
        this.orderinfo[key] += 1
      } else {
        this.orderinfo[key] = 1
      }
      this.printOrder()
    }
  }

  async start () {
    console.log(this.header)
    await this.showMenu()
    await this.saveData()
    if (await lineReader.askYesNoQuestion()) {
      await this.saveAdress()
      console.log(this.footer)
      await this.placeOrder()
      //await this.placeOrderMoto()
      console.log(this.reqAns)
    } else {
      console.log('Orden cancelada...')
    }
  }

  async saveAdress () {
    const address = await lineReader.askQuestion('Ingrese dirección')
    console.log(address)
    this.orderinfo.address = address
  }
}

export const clientServer = new ClientServer()