'use strict';

/**
 * This is a Node.JS application to create shipment
 */

const helper = require('../contractHelper');
const getUserRole=require('./getUserRole');

async function createShipment(buyerCRN, drugName, listOfAssets, transporterCRN) {

	try {
		//validate buyer Role to invoke CA
		let userRole=await getUserRole.execute(buyerCRN);
		userRole=userRole.toString();
		const pharmanetContract = await helper.getContractInstance(`${userRole.toUpperCase()}_ADMIN`,userRole.toLowerCase(),userRole.toLowerCase());

		// invoke Creaate Shipment
		console.log('.....Invoke Create Shipment');
		const shipmentBuffer = await pharmanetContract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets, transporterCRN);
		
		// process response
		console.log('.....Processing Create Shipment  Transaction Response \n\n');
		let newshipment = JSON.parse(shipmentBuffer.toString());
		console.log(newshipment);
		console.log('\n\n.....Create Shipment Transaction Complete!');
		return newshipment;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = createShipment;
