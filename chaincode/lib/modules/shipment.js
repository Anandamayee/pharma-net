'use strict'

class Shipment {
    /**
	 * Constructor function
	 * @param shipmentObject {Object}
	 */
    constructor(shipmentObject) {
        Object.assign(this, shipmentObject);
    }
    /**
    * Get class of this model
    * @returns {string}
    */
    static getClass() {
        return `org.pharma-network.pharmanet.models.shipment`;
    }
}

module.exports=Shipment;