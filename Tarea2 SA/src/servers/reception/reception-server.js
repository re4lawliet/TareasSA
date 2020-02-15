import { Server } from '../server'
import { routerV1 as receptionRouter } from '../../routers/reception-router'
import { fetchQuery } from '../../request-manager'
//import { configuration } from '../../config/config'
import { receptioncontroller } from '../../controllers/reception-controller'
import { lineReader } from '../../line-reader'

class ReceptionServer extends Server {
  constructor () {
    super(3003)
    super.routers(receptionRouter)
    this.menuMsn = '------ Ordenes en Cola ------'
    this.consoleMsn = '------ Escriba 0 para salir y 1 para mostrar menú ------\n'
  }

  async showOrders () {
    console.log(this.menuMsn)
    const orders = receptioncontroller.orders.map((el, idx) => {
      if (el.status === 0) {
        console.log(`${idx}.`, `C-${el.id.toString().padStart(6, '0')}`)
        return idx
      }
    })
    if (orders.length === 0) {
      console.log('------ No hay ordenes en Cola ------')
      return
    }
    let opt = -1


      const address = await lineReader.askQuestion('Seleccione la Orden: ')
      if (address == orders){
        console.log('Se Enviara la Orden No.'+orders+' al Motorista')
        //console.log(receptioncontroller.orders[orders])
        this.placeOrder(orders)
      }else{
        console.log('Orden Invalida Seleccione otra Orden')
      }

   

    //console.log(receptioncontroller.orders[orders])

      //receptioncontroller.changeStatus(opt, 1)
      //this.placeOrder(opt)
    
  }

  placeOrder (index) {
    //const { id, address } = receptioncontroller.orders[index]
    console.log('C- 00000',receptioncontroller.orders[index].id)
    //console.log('placeOrder ->',id,' address -> ',address)
    //(URL, metodo(POST o GET), Body(JSON))                                        .then es la respuesta 
    fetchQuery('http://127.0.0.1:3004/accept', 'POST', receptioncontroller.orders[index]).then(res => {
      if (res.success) {
        console.log('Orden colocada En Motoristas')
      } else {
        console.log('No hay repartidores disponibles')
        receptioncontroller.changeStatus(index, 0)
      }
    })
  }

  async placeOrderMoto () {
    
  }

  async start () {
    const opt = -1
    while ((opt !== await lineReader.askQuestion(this.consoleMsn)) !== 0) {
      if (opt === 0) break
      this.showOrders()
    }
  }
}

export const receptionServer = new ReceptionServer()
