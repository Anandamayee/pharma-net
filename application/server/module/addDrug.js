'use strict';

/**
 * This is a Node.JS application to add a drug to ledger
 */

const helper = require('../contractHelper');
const getUserRole = require('./getUserRole');

async function addDrug(drugName, serialNo, mfgDate, expDate, companyCRN) {

	try {
		let userRole = await getUserRole.execute(companyCRN);
		userRole=userRole.toString();
		const pharmanetContract = await helper.getContractInstance(`${userRole.toUpperCase()}_ADMIN`, userRole.toLowerCase(), userRole.toLowerCase());

		// add a new drug
		console.log('.....Add Drug to ledger');
		const drugBuffer = await pharmanetContract.submitTransaction('addDrug', drugName, serialNo, mfgDate, expDate, companyCRN);

		// listen to addDrug event
		const listener=await pharmanetContract.addContractListener('addDrug', 'addDrug', (err, event, blkNum, txid, status, options) => {
			console.log('event received', status, event, blkNum, txid);  
			if (err) {
			   console.error('error', err);
			} else if (status && status === 'VALID') {
			   console.log("payload ",event.payload.toString());
			}
		})

		// process response
		console.log('.....Processing Add Drug  Transaction Response \n\n');
		let newDrug = JSON.parse(drugBuffer.toString());
		console.log(newDrug);
		console.log('\n\n.....Add Drug Transaction Complete!');
		return newDrug;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = addDrug;
