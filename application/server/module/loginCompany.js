'use strict';

/**
 * This is a Node.JS application to register a company
 */

const helper = require('../contractHelper');

async function loginCompany(userName,userPassword) {

	try {

		// const pharmanetContract = await helper.getContractInstance(`${organisationRole.toUpperCase()}_ADMIN`,organisationRole.toLowerCase(),organisationRole.toLowerCase());
        await helper.checkUserExist(userName,userPassword)
		// invoke Creaate company
		console.log('.....Invoke register Company');
		// const companyBuffer = await pharmanetContract.submitTransaction('registerCompany', companyCRN, companyName, Location, organisationRole);

		// // process response
		// console.log('.....Processing register Company  Transaction Response \n\n');
		// let newcompany = JSON.parse(companyBuffer.toString());
		// console.log(newcompany);
		// console.log('\n\n.....register Company Transaction Complete!');
		return userPassword;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}


module.exports.execute = loginCompany;
