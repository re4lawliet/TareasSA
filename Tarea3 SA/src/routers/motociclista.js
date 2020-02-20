import * as express from 'express'
import { motoController } from '../controllers/moto-controller'
export const routerV1 = express.Router()
class MotoRouter {

  EncenderMoto(req, res){
    res.send('RUM RUM');
  } 

  //metodo para aceptar una orden
  async acceptOrder (req, res) {
    const { address, ...order } = req.body
    //console.log(address)
    console.log('C- 00000'+order.id)
    //receptioncontroller.addOrder(order)
    //await receptioncontroller.writeAllOrders()
    res.send({ success: true, id: motoController.orderId })
  }
}

//instanciamos la clase Router
const moto = new MotoRouter()
//al router le creamos el metodo get con su funcion adjunta (Como en el web.php de laravel)
routerV1.get('/get', moto.EncenderMoto)
routerV1.post('/accept', moto.acceptOrder)