'use strict'
const { CommonModule } = require('../commonlib/commonModule');

class OrderList {
    constructor(ctx) {
        this.ctx = ctx;
        this.name = 'org.pharma-network.pharmanet.lists.orderList';
    }

     /**
	 * Returns the Order model stored in blockchain identified by this key
	 * @param orderKey
	 * @returns {Promise<Order>}
	 */
    async getOrderDetails(orderKey, className) {
        let orderCompositeKey = this.getCompositeKey(orderKey);
        let responseBuffer = await this.ctx.stub.getState(orderCompositeKey);
        return CommonModule.fromBuffer(responseBuffer, className);
    }

    /**
	 * Adds a Order model to the blockchain
	 * @param orderObject {Drug}
	 * @returns {Promise<void>}
	 */
    async orderDrug(orderObject) {
        let requestBuffer = CommonModule.toBuffer(orderObject);
        await this.ctx.stub.putState(orderObject.poID, requestBuffer);
    }
    /**
	 * Return  Order CompositeKey
	 * @param orderKey 
	 * @returns string
	 */
    getCompositeKey(orderKey) {
        return this.ctx.stub.createCompositeKey(this.name, orderKey.split('::'));
    }
}

module.exports=OrderList;