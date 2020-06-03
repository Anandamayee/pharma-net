
'use strict';


const { Context } = require('fabric-contract-api');
const DrugList = require('../lists/drugList.js');
const OrderList = require('../lists/orderList.js');
const ShipmentList = require('../lists/shipmentList.js');
const RegisteredCompanyList = require('../lists/registeredCompanyList.js');


class ListContextModule extends Context {
    constructor() {
        super();
        // Add various model lists to the context class object
        // this : the context instance
        this.drugList = new DrugList(this);
        this.orderList = new OrderList(this);
        this.shipmentList = new ShipmentList(this);
        this.registeredCompanyList = new RegisteredCompanyList(this);
    }
}


module.exports = ListContextModule;
