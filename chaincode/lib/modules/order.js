'use strict'

class Order {
 /**
	 * Constructor function
	 * @param orderObject {Object}
	 */
    constructor(orderObject) {
        Object.assign(this, orderObject);
    }
    /**
    * Get class of this model
    * @returns {string}
    */
    static getClass() {
        return `org.pharma-network.pharmanet.models.order`;
    }
}

module.exports=Order;