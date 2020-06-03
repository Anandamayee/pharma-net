'use strict'

class Company {
    /**
	 * Constructor function
	 * @param companyObject {Object}
	 */
    constructor(companyObject) {
        Object.assign(this, companyObject);
    }
    /**
    * Get class of this model
    * @returns {string}
    */
    static getClass(role) {
        return `org.pharma-network.pharmanet.models.${role}`;
    }
}

module.exports=Company;