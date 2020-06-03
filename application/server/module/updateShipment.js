'use strict';

/**
 * This is a Node.JS application to update shipment
 */

const helper = require('../contractHelper');
const getUserRole=require('./getUserRole');

async function updateShipment(buyerCRN, drugName, transporterCRN) {

	try {

		//validate buyer Role to invoke transporter
		let userRole=await getUserRole.execute(transporterCRN);
		userRole=userRole.toString();
		const pharmanetContract = await helper.getContractInstance(`${userRole.toUpperCase()}_ADMIN`,userRole.toLowerCase(),userRole.toLowerCase());

		// invoke Creaate Shipment
		console.log('.....Invoke update Shipment');
		const shipmentBuffer = await pharmanetContract.submitTransaction('updateShipment', buyerCRN, drugName, transporterCRN);

		// process response
		console.log('.....Processing update Shipment  Transaction Response \n\n');
		let newshipment = JSON.parse(shipmentBuffer.toString());
		console.log(newshipment);
		console.log('\n\n.....update Shipment Transaction Complete!');
		return newshipment;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = updateShipment;
