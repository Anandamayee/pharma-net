'use strict';

/**
 * This is a Node.JS application to view a drug history
 */

const helper = require('../contractHelper');

async function viewHistory(drugName, serialNo) {

	try {
		const pharmanetContract = await helper.getContractInstance('CONSUMER_ADMIN','consumer','consumer');

		// invoke Creaate drug
		console.log('.....Invoke viewDrug History');
		const drugBuffer = await pharmanetContract.submitTransaction('viewHistory', drugName, serialNo);

		// process response
		console.log('.....Processing viewDrug History  Transaction Response \n\n');
		let newdrug = JSON.parse(drugBuffer.toString());
		console.log(newdrug);
		console.log('\n\n.....viewDrug History Transaction Complete!');
		return newdrug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = viewHistory;
