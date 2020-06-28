const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
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
async function createEnrollIdentity(username, userPassword, identityFile, fabricUser) {
	// A gateway defines which peer is used to access Fabric network
	// It uses a common connection profile (CCP) to connect to a Fabric Peer
	gateway = new Gateway();
	// A wallet is where the credentials to be used for this transaction exist
	const wallet = new FileSystemWallet(`./identity/${identityFile}`);

	// What is the username of this Client user accessing the network?
	const user = `${username}-${userPassword}-${identityFile}`
	// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
	let connectionProfile = yaml.safeLoad(fs.readFileSync(`./connection_profile/connection-profile-${connectionProfileFile}.yaml`, 'utf8')); 44
	// What is the username of this Client user accessing the network?
	const fabricUserName = fabricUser

	const userExists = await wallet.exists(user);
	if (userExists) {
		throw new Error('User already exist')
	}
	// Set connection options; identity and wallet
	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: false, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	console.log('.....Connecting to Fabric Gateway');
	await gateway.connect(connectionProfile, connectionOptions);


	// Get the CA client object from the gateway for interacting with the CA.
	const ca = gateway.getClient().getCertificateAuthority();
	const adminIdentity = gateway.getCurrentIdentity();

	// Register the user, enroll the user, and import the new identity into the wallet.
	const secret = await ca.register({ affiliation: 'org', enrollmentID: user, role: 'client' }, adminIdentity);
	console.log('Successfully registered user ' + user + ' and the secret is ' + secret );

	connectionProfile.certificateAuthorities()



}
module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;