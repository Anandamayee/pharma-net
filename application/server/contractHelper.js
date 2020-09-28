const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const { User } = require('fabric-client')
let gateway;
async function getContractInstance(fabricUser, identityFile, connectionProfileFile) {

	// A gateway defines which peer is used to access Fabric network
	// It uses a common connection profile (CCP) to connect to a Fabric Peer
	gateway = new Gateway();
	// A wallet is where the credentials to be used for this transaction exist
	const wallet = new FileSystemWallet(`./identity/${identityFile}`);

	// What is the username of this Client user accessing the network?
	const fabricUserName = fabricUser
	// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
	let connectionProfile = yaml.safeLoad(fs.readFileSync(`./connection_profile/connection-profile-${connectionProfileFile}.yaml`, 'utf8'));
	// Set connection options; identity and wallet
	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: false, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	console.log('.....Connecting to Fabric Gateway');
	await gateway.connect(connectionProfile, connectionOptions);

	// Access pharma channel
	console.log('.....Connecting to channel - pharmachannel');
	const channel = await gateway.getNetwork('pharmachannel');

	// Get instance of deployed pharmanet contract
	// @param Name of chaincode
	// @param Name of smart contract
	console.log('.....Connecting to pharmanet Smart Contract');
	return channel.getContract('pharmanet', 'org.pharma-network.pharmanet');
}

function disconnect() {
	console.log('.....Disconnecting from Fabric Gateway');
	gateway.disconnect();
}



async function createEnrollIdentity(username, userPassword, identityFile) {
	try {
		// A wallet is where the credentials to be used for this transaction exist
		const wallet = new FileSystemWallet(`./identity/${identityFile}`);
		// console.log("wallet  ", wallet);
		// console.log("process", process.argv[2],"    ",process.argv[3], process.cwd());
		
		// What is the username of this Client user accessing the network?
		const identityLabel = `${username}_${userPassword}_${identityFile.toUpperCase()}_CLIENT`;
		// console.log("identityLabel  ", identityLabel);
		// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
		let connectionProfile = yaml.safeLoad(fs.readFileSync(`./connection_profile/connection-profile-${identityFile}.yaml`, 'utf8'));
		// What is the username of this Client user accessing the network?
		// const fabricUserName = fabricUser
		// console.log("connectionProfile  ", connectionProfile);
		const userExists = await wallet.exists(identityLabel);
		// console.log("userExists  ", userExists);
		if (userExists) {
			return 'User already exist';
		}


		// Check to see if we've already enrolled the admin user.
		const adminExists = await wallet.exists(`${identityFile.toUpperCase()}_ADMIN`);
		// console.log(adminExists);
		
		if (!adminExists) {
			console.log(
				'An identity for the admin user "admin" does not exist in the wallet'
			);
			console.log("Run the enrollAdmin.js application before retrying");
			return;
		}

		// Set connection options; identity and wallet
		const gateway = new Gateway();
		let connectionOptions = {
			wallet: wallet,
			identity: `${identityFile.toUpperCase()}_ADMIN`,
			discovery: { enabled: false, asLocalhost: true }
		};

		// Connect to gateway using specified parameters
		console.log('.....Connecting to Fabric Gateway');
		await gateway.connect(connectionProfile, connectionOptions);
		// Get the CA client object from the gateway for interacting with the CA.
		const client=gateway.getClient();
		const ca = client.getCertificateAuthority();
		const adminIdentity = await client.getUserContext(`${identityFile.toUpperCase()}_ADMIN`,true)
		// console.log("context",adminIdentity);
		const user=new User({
			enrollmentID:username,
			name:username
		})
		// Register the user, enroll the user, and import the new identity into the wallet.
		const secret = await ca.register(
			{
				enrollmentID: identityLabel,
				attrs: [{ name: 'role', value: 'approver', ecert: true }],
				affiliation:identityFile.toLowerCase()+".pharma-network.com.department1"
			},
			adminIdentity
		);
		console.log("secret  ", secret);


		// const user=new User({enrollmentID: username,name:username,enrollmentSecret: userPassword,signingIdentity});
		// console.log("user",user);

		// Register the user, enroll the user, and import the new identity into the wallet.
		// const registered=await ca.register({ enrollmentID: username,role:"client" },user);
		// console.log("registered  ",registered);
		const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
		console.log('Successfully registered user ' + user + ' and the secret is ' + enrollment);

		const identity = X509WalletMixin.createIdentity(`${identityFile}MSP`, enrollment.certificate, enrollment.key.toBytes());
		console.log("identity  ", identity);
		await wallet.import(identityLabel, identity);
		console.log('Successfully enrolled client "user1" and imported it into the wallet', identity);
	} catch (error) {
		console.log(`Error  \n\n ${error} \n\n`);
		throw new Error(error);

	}
}

async function checkUserExist(username, userPassword) {
	try {
		// A wallet is where the credentials to be used for this transaction exist
		const folderNames = fs.readdirSync('./identity/');
		for (let folder of folderNames) {
			console.log("folder", folder);
			let wallet = new FileSystemWallet(`./identity/${folder}`);
			let allUsers = await wallet.list();
			console.log("allUsers", allUsers);
		}
		console.log("fs.readdirSync('./identity/')", fs.readdirSync('./identity/'));


		// // What is the username of this Client user accessing the network?
		// const identityLabel = `${username}_${userPassword}_${\*}_CLIENT`;
		// // Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
		// let connectionProfile = yaml.safeLoad(fs.readFileSync(`./connection_profile/connection-profile-${identityFile}.yaml`, 'utf8')); 
		// // What is the username of this Client user accessing the network?
		// // const fabricUserName = fabricUser

		// const userExists = await wallet.exists(identityLabel);
		// if (userExists) {
		// 	return 'User already exist';
		// }
		// // Get the CA client object from the gateway for interacting with the CA.
		// const caURL = connectionProfile.certificateAuthorities[`ca.${identityFile}.pharma-network.com`];
		// const ca = new FabricCAServices(caURL);

		// // Register the user, enroll the user, and import the new identity into the wallet.
		// const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: userPassword });
		// console.log('Successfully registered user ' + user + ' and the secret is ' + enrollment);

		// const identity = X509WalletMixin.createIdentity(`${identityFile}MSP`, enrollment.certificate, enrollment.key.toBytes());
		// await wallet.import(identityLabel, identity);
		// console.log('Successfully enrolled client "user1" and imported it into the wallet', identity);
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	}
}



module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;
module.exports.createEnrollIdentity = createEnrollIdentity;
module.exports.checkUserExist = checkUserExist;