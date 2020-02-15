//import { fileinout } from '../utilities/file-in-out'
import * as path from 'path'

class ReceptionController {
  constructor () {
    this.orders = []
    this.orderId = 1
    //this.readPendingOrders()
  }

  deliverOrder (index) {
    if (this.hasOrder(index)) {
      this.findOrder(index).status = 2
      return true
    } else {
      return false
    }
  }

  addOrder (order) {
    const nOrder = { ...order, status: 0, id: this.orderId++ }
    this.orders.push(nOrder)
    return true
  }

  hasOrder (index) {
    return this.orders.find(it => it.id === index) !== undefined
  }

  findOrder (index) {
    return this.orders.find(it => it.id === index)
  }

  cancelOrder (index) {
    if (this.hasOrder(index)) {
      this.findOrder(index).status = 2
      return true
    } else {
      return false
    }
  }

  async writeAllOrders () {
    //await fileinout.writeFile(path.join(__dirname, '../database/reception.txt'), JSON.stringify(this.orders))
  }

  readPendingOrders () {
    //const data = fileinout.readFile(path.join(__dirname, '../database/reception.txt'))
    if (data !== '') {
      this.orders = JSON.parse(data)
      this.findLast()
    }
  }

  findLast () {
    let max = 1
    this.orders.forEach(it => {
      if (it.id > max) max = it.id
    })

    this.orderId = max
  }

  changeStatus (index, status) {
    this.orders[index].status = status
    //this.writeAllOrders()
  }
}

export const receptioncontroller = new ReceptionController()