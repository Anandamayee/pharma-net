'use strict';

/**
 * This is a Node.JS application to view a drug details
 */

const helper = require('../contractHelper');

async function viewDrugCurrentState(drugName, serialNo) {

	try {
		const pharmanetContract = await helper.getContractInstance('CONSUMER_ADMIN','consumer','consumer');

		// invoke Creaate drug
		console.log('.....Invoke viewDrug CurrentState');
		const drugBuffer = await pharmanetContract.submitTransaction('viewDrugCurrentState', drugName, serialNo);

		// process response
		console.log('.....Processing viewDrug CurrentState  Transaction Response \n\n');
		let newdrug = JSON.parse(drugBuffer.toString());
		console.log(newdrug);
		console.log('\n\n.....viewDrug CurrentState Transaction Complete!');
		return newdrug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = viewDrugCurrentState;
