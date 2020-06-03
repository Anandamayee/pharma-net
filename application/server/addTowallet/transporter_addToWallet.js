'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: TRANSPORTER_ADMIN
 *  User Organization: TRANSPORTER
 *  User Role: Admin
 *
 */

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, '../../../network/crypto-config'); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet('./identity/manufacturer');

async function main(organization) {

	// Main try/catch block
	try {
		let certificatePath = path.resolve(crypto_materials, `peerOrganizations/${organization}.pharma-network.com/users/Admin@${organization}.pharma-network.com/msp/signcerts/Admin@${organization}.pharma-network.com-cert.pem`);
		let privatekeyPath = path.resolve(crypto_materials, `peerOrganizations/${organization}.pharma-network.com/users/Admin@${organization}.pharma-network.com/msp/keystore`);
		// A wallet is a filesystem path that stores a collection of Identities
		const wallet = new FileSystemWallet(`./identity/${organization}`);
		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey =fs.readFileSync(path.resolve(privatekeyPath,fs.readdirSync(privatekeyPath)[0])).toString() ;
		// Load credentials into wallet
		const identityLabel = `${organization.toUpperCase()}_ADMIN`;
		const identity = X509WalletMixin.createIdentity(`${organization}MSP`, certificate, privatekey);
	
		await wallet.import(identityLabel, identity);

	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

module.exports.execute = main;
