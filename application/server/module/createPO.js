'use strict';

/**
 * This is a Node.JS application to Issue a Create order
 */

const helper = require('../contractHelper');
const getUserRole=require('./getUserRole');

async function createPO(buyerCRN, sellerCRN, drugName, quantity) {

	try {

        //validate buyer Role to invoke CA
		let userRole=await getUserRole.execute(buyerCRN);
		userRole=userRole.toString();
		const pharmanetContract = await helper.getContractInstance(`${userRole.toUpperCase()}_ADMIN`,userRole.toLowerCase(),userRole.toLowerCase());

		// invoke Creaate PO
		console.log('.....Invoke Create PO');
		const POBuffer = await pharmanetContract.submitTransaction('createPO', buyerCRN, sellerCRN, drugName, quantity.toString());

		// process response
		console.log('.....Processing Create PO  Transaction Response \n\n',POBuffer.toString());
		let newPO = JSON.parse(POBuffer.toString());
		console.log(newPO);
		console.log('\n\n.....Create PO Transaction Complete!');
		return newPO;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = createPO;
