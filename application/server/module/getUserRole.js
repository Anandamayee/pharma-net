'use strict';

/**
 * This is a Node.JS application to Validate userRole incase to invoke createPO,createShipment,updateShipment
 */

const helper = require('../contractHelper');

async function getUserRole(companyCRN) {

	try {
		const pharmanetContract = await helper.getContractInstance('MANUFACTURER_ADMIN','manufacturer','manufacturer');

		// invoke Creaate company
		console.log('.....Invoke register Company');
		const userRole = await pharmanetContract.submitTransaction('getUserRole', companyCRN);

		// process response
		console.log('.....user role   ');
		return userRole;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = getUserRole;
