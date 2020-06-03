'use strict'

class Drug {
  /**
	 * Constructor function
	 * @param drugObject {Object}
	 */
    constructor(drugObject) {
        Object.assign(this, drugObject);
    }
    /**
    * Get class of this model
    * @returns {string}
    */
    static getClass() {
        return `org.pharma-network.pharmanet.models.drug`;
    }
}

module.exports=Drug;