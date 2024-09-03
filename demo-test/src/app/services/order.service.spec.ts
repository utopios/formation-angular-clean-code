import { TestBed } from "@angular/core/testing"
import { OrderService } from "./order.service"
import { Order } from "../models/order.model"

describe('OrderService', () => {

    let orderService:OrderService
    beforeEach(() => {
        //A => Arange
        TestBed.configureTestingModule({})
        orderService = TestBed.inject(OrderService)
    })

    it('should caluclate the total of an order', () => {
           ///AAA
        //    //A => Arange
        //    TestBed.configureTestingModule({})
        //    let oderService:OrderService = TestBed.inject(OrderService)
           const order:Order = {id: '1', products : [{name: 'product 1', price: 10, qty: 1}, {name: 'product 2', price: 20, qty: 3}]}
           //A => ACT
           const calculatedTotal = orderService.calculateOrderTotal(order) 
           //A => Assert
           expect(calculatedTotal).toEqual(70)
    })
})