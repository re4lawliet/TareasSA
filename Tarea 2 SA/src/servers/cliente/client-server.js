import { lineReader } from '../../line-reader'
import { fetchQuery } from '../../request-manager'
//import { configuration } from '../../config/config'
import { Server } from '../server'
import { routerV1 as routerclient } from '../../routers/client-router'

class ClientServer extends Server {
  constructor () {
    super(3002)
    super.routers(routerclient)
    this.header = '****** MENU DE COMIDA ******'
    this.footer = '******  GRACIAS!! ******'
    this.oHeader = '------------------   PEDIDO   ------------------'
    this.oFooter = '------------------    FIN     ------------------'
    this.divider = '****************'
    this.reqAns = '------------- Esperando  respuesta -------------'
    this.msn = 'Elegir una opción\n'
    this.address = 'Ingrese su dirección'
    this.menuOptions = {
      C0101: [50, 'Hamburguesa'],
      C0102: [75, 'Pizza'],
      C0103: [15, 'Papas'],
      C0104: [50, 'Tacos'],
      C0105: [36, 'Burrito'],
      C0106: [99, 'Bebida'],
      C0107: [50, 'Pollo'],
      C0108: [75, 'Mariscos'],
      C0109: [15, 'Arroz chino'],
      C0110: [50, 'Orange Chicken'],
      C0111: [36, 'Chao Mein']
    }
    this.orderinfo = {}
  }

  async placeOrder () {
    const data = await fetchQuery('http://127.0.0.1:3003/accept', 'POST', this.orderinfo)
    console.log(`La orden se envió correctamente, pedido no. ${data.id}`)
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