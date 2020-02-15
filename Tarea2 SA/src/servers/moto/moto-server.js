//importando la clase server para la configuracion de este servidor
import { Server } from '../server'
//importando nuestra clase de routers para las llamadas 
import { routerV1 as motoRouter } from '../../routers/motociclista'
//importando fetchQuery para hacer uso de consultas
import { fetchQuery } from '../../request-manager'

//import { configuration } from '../../config/config'

//importar el controlador del motociclista con lista de motocicletas y tiempo de entrega
//import { receptioncontroller } from '../../controllers/reception-controller'

//importando el lector de teclado en consola
import { lineReader } from '../../line-reader'


//creando la clase
class MotoServer extends Server{

    //creando el constructor
    constructor(){
        //asignamos el puerto que es un atributo en la clase SERVER
        super(3004)
        //asignamos los routers que va a utilizar el servidor
        super.routers(motoRouter)
        //creando los mensajes que se mostraran
        this.newRequest = 'Ingreso de Solicitudes\n'
        this.confirm = 'Escriba 1 para confirmar pedido y 0 para rechazarla\n'
        this.travel = 'Escriba 1 para Despachar\n'
        this.deliver = 'Elija el Pedido que va Despachar\n'
        this.wait = 'Esperando nuevos Pedidos'
    }

    async start () {
        console.log(this.wait)
        /*await this.showMenu()
        await this.saveData()
        if (await lineReader.askYesNoQuestion()) {
          await this.saveAdress()
          console.log(this.footer)
          await this.placeOrder()
          console.log(this.reqAns)
        } else {
          console.log('Orden cancelada...')
        }*/
      }


}


//damos permiso a la clase para que sea exportada
export const motoServer = new MotoServer()