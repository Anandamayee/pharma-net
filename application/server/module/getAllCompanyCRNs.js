'use strict';

/**
 * This is a Node.JS application to view a drug details
 */

const helper = require('../contractHelper');

async function getAllCompanyCRNs() {

	try {
		const pharmanetContract = await helper.getContractInstance('MANUFACTURER_ADMIN','manufacturer','manufacturer');

		// invoke Creaate drug
		console.log('.....Invoke getAllUserList');
		const userBuffer = await pharmanetContract.submitTransaction('getAllUserList');

		// process response
		console.log('.....Processing getAllUserList  Transaction Response \n\n');
		let users = JSON.parse(userBuffer.toString());
		console.log(users);
		console.log('\n\n.....getAllUserList Transaction Complete!');
		return users;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = getAllCompanyCRNs;
