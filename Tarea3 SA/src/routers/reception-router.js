import * as express from 'express'
import { receptioncontroller } from '../controllers/reception-controller'
import { fetchQuery } from '../request-manager'
//import { configuration } from '../config/config'

export const routerV1 = express.Router()

class Reception {
  async acceptOrder (req, res) {
    const { address, ...order } = req.body
    console.log(address)
    receptioncontroller.addOrder(order)
    //await receptioncontroller.writeAllOrders()
    res.send({ success: true, id: receptioncontroller.orderId })
  }

  async deliverOrder (req, res) {
    const { index } = req.body
    if (receptioncontroller.hasOrder(index)) {
      const order = receptioncontroller.findOrder(index)
      //console.log(await fetchQuery(configuration.DELIVERY_API_URL, 'POST', order))
      res.send({ success: true })
    } else {
      res.send({ success: false })
    }
  }
}

const reception = new Reception()
routerV1.post('/accept', reception.acceptOrder)
routerV1.post('/delivery', reception.deliverOrder)
