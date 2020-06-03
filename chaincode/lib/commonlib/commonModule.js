'use strict'

const Company=require('../modules/company');
const Drug=require('../modules/drug');
const Order=require('../modules/order');
const Shipment=require('../modules/shipment');

const OrganisationRole={
    "Manufacturer":1,
    "Distributor":2,
    "Retailer":3,
    "Transporter":4
}
const TransportStatus=['delivered','in-transit']

const classMapping={
    company:Company,
    drug:Drug,
    order:Order,
    shipment:Shipment,
}

class CommonModule {
 /**
	 * Convert the buffer stream received from blockchain into an object of this model
	 * @param buffer {Buffer}
	 */

    static fromBuffer(buffer, className) {
        let json = JSON.parse(buffer.toString());
        return new classMapping[className](json);
    }
	/**
	 * Convert the object of this model to a buffer stream
	 * @returns {Buffer}
	 */
    static toBuffer(jsonObject) {
        return Buffer.from(JSON.stringify(jsonObject));
    }
    /**
	 * Create a key string joined from different key parts
	 * @param keyParts {Array}
	 * @returns {*}
	 */
    static makeKey(keyParts) {
        return keyParts.map(part => JSON.stringify(part)).join("::");
    }
    /**
	 * Create a new instance of this model
	 * @returns {ClassName}
	 * @param jsonObject {Object}
	 */
    static createInstance(jsonObject, className) {
        return new classMapping[className](jsonObject);
    }
   

}

module.exports = {
    CommonModule: CommonModule,
    OrganisationRole: OrganisationRole,
    TransportStatus: TransportStatus
};