'use strict'

const { CommonModule } = require('../commonlib/commonModule');

class ShipmentList {
    constructor(ctx) {
        this.ctx = ctx;
        this.name = 'org.pharma-network.pharmanet.lists.shipmentList';
    }
    /**
        * Returns the shipment model stored in blockchain identified by this key
        * @param shipmentKey
        * @returns {Promise<shipment>}
        */
    async getshipmentDetails(shipmentKey, className) {
        let shipmentCompositeKey = this.getCompositeKey(shipmentKey);
        let responseBuffer = await this.ctx.stub.getState(shipmentCompositeKey);
        return CommonModule.fromBuffer(responseBuffer, className);
    }

    /**
	 * Adds a shipment model to the blockchain
	 * @param shipmentObject {shipment}
	 * @returns {Promise<void>}
	 */
    async addshipment(shipmentObject) {
        let requestBuffer = CommonModule.toBuffer(shipmentObject);
        await this.ctx.stub.putState(shipmentObject.shipmentID, requestBuffer);
    }

    /**
	 * Update a shipment model to the blockchain
	 * @param shipmentObject {shipment}
	 * @returns {Promise<void>}
	 */
    async updateshipment(shipmentObject) {
        let requestBuffer = CommonModule.toBuffer(shipmentObject);
        await this.ctx.stub.putState(shipmentObject.shipmentID, requestBuffer);
    }

    /**
	 * Return  shipment CompositeKey
	 * @param shipmentKey 
	 * @returns string
	 */
    getCompositeKey(shipmentKey) {
        return this.ctx.stub.createCompositeKey(this.name, shipmentKey.split('::'));
    }
    /**
       * Get All registered  shipments  from the blockchain
       * @returns Array<{key,value}>
       */
    async getAllShipments() {
        let iterator = await this.ctx.stub.getStateByPartialCompositeKey(this.name, []);
        let result;
        let allshipments = []
        do {
            result = await iterator.next();
            console.log(result);
            if (result && result.value && result.value.value.toString()) {
                let key = result.value.key;
                let value = result.value.value.toString('utf8');
                allshipments.push({ key: key, value: value })
            }
        }
        while (!result.done);
        return allshipments;
    }

}

module.exports = ShipmentList;