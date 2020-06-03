'use strict';

/**
 * This is a Node.JS application to retail a drug
 */

const helper = require('../contractHelper');
const getUserRole=require('./getUserRole');

async function retailDrug(drugName, serialNo, retailerCRN, customerAadhar) {

	try {

        //validate buyer Role to invoke CA
		let userRole=await getUserRole.execute(retailerCRN);
		userRole=userRole.toString();
		const pharmanetContract = await helper.getContractInstance(`${userRole.toUpperCase()}_ADMIN`,userRole.toLowerCase(),userRole.toLowerCase());

		// invoke Creaate PO
		console.log('.....Invoke Retail Drug');
		const POBuffer = await pharmanetContract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);

		// process response
		console.log('.....Processing Retail Drug  Transaction Response \n\n',POBuffer.toString());
		let drug = JSON.parse(POBuffer.toString());
		console.log(drug);
		console.log('\n\n.....Retail Drug Transaction Complete!');
		return drug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = retailDrug;
