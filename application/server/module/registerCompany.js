'use strict';

/**
 * This is a Node.JS application to register a company
 */

const helper = require('../contractHelper');

async function registerCompany(companyCRN, companyName, Location, organisationRole,userPassword) {

	try {

		// await helper.createEnrollIdentity(companyCRN, userPassword, organisationRole.toLowerCase());

		const pharmanetContract = await helper.getContractInstance(`${organisationRole.toUpperCase()}_ADMIN`,organisationRole.toLowerCase(),organisationRole.toLowerCase());

		// invoke Creaate company
		console.log('.....Invoke register Company');
		const companyBuffer = await pharmanetContract.submitTransaction('registerCompany', companyCRN, companyName, Location, organisationRole);

		// process response
		console.log('.....Processing register Company  Transaction Response \n\n');
		let newcompany = JSON.parse(companyBuffer.toString());
		console.log(newcompany);
		console.log('\n\n.....register Company Transaction Complete!');
		return newcompany;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = registerCompany;
