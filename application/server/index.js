const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const errorToJSON = require('error-to-json')

// Import all function modules
const addToWallet = require('./module/addToWallet');
const addDrug = require('./module/addDrug');
const registerCompany = require('./module/registerCompany');
const updateShipment = require('./module/updateShipment');
const createShipment = require('./module/createShipment');
const createPO = require('./module/createPO');
const retailDrug = require('./module/retailDrug');
const viewDrugDetails = require('./module/viewDrugDetails');
const viewDrugHistory = require('./module/viewDrugHistory');
const getAllCompanyCRNs=require('./module/getAllCompanyCRNs')

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharma App');

app.get('/', (req, res) => res.send('hello world'));

// Create identity of all the organizations using CA,private and public key
app.post('/addToWallet', (req, res) => {
	addToWallet.execute()
			.then(() => {
				console.log('User credentials added to wallet');
				const result = {
					status: 'success',
					message: 'User credentials added to wallet'
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

// API call to add a drug to ledger

app.post('/addDrug', (req, res) => {
	addDrug.execute(req.body.drugName, req.body.serialNo, req.body.mfgDate, req.body.expDate, req.body.companyCRN)
			.then((drug) => {
				console.log('New Drug added to ledger');
				const result = {
					status: 'success',
					message: 'New drug added to network',
					drug: drug
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


// API call to register a comapny to ledger

app.post('/registerCompany', (req, res) => {
	registerCompany.execute(req.body.companyCRN, req.body.companyName, req.body.Location, req.body.organisationRole)
			.then((company) => {
				const result = {
					status: 'success',
					message: 'Congratulations!!! Your company has successfully registered',
					company: company
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


// API call to create an order

app.post('/createPO', (req, res) => {
	createPO.execute(req.body.buyerCRN, req.body.sellerCRN, req.body.drugName, req.body.quantity)
			.then((order) => {
				console.log('Your order has placed');
				const result = {
					status: 'success',
					message: 'Your order has placed',
					order: order
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


// API call to create a shipment

app.post('/createShipment', (req, res) => {
	createShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.listOfAssets, req.body.transporterCRN)
			.then((shipment) => {
				console.log('Your shipment has created');
				const result = {
					status: 'success',
					message: 'Your shipment has created',
					shipment: shipment
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


// API call to update a shipment

app.put('/updateShipment', (req, res) => {
	updateShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.transporterCRN)
			.then((shipment) => {
				console.log('Your shipment has updated');
				const result = {
					status: 'success',
					message: 'Your shipment has updated',
					shipment: shipment
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


// API call to retail a drug to customer 

app.post('/retailDrug', (req, res) => {
	retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar)
			.then((retail) => {
				console.log('Your shipment has updated');
				const result = {
					status: 'success',
					message: 'Your shipment has updated',
					retailDetails: retail
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


// API call to view history of a drug registered in the ledger

app.get('/viewDrugHistory', (req, res) => {
	viewDrugHistory.execute(req.query.drugName, req.query.serialNo)
			.then((drug) => {
				console.log('Got drug History');
				const result = {
					status: 'success',
					message: 'Got drug History',
					drugHistory: drug
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

// API call to view current state of a drug registered in the ledger

app.get('/viewDrugDetails', (req, res) => {
	viewDrugDetails.execute(req.query.drugName, req.query.serialNo)
			.then((drug) => {
				console.log('Got Drug Details');
				const result = {
					status: 'success',
					message: 'Drug details',
					drugDetail: drug
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.get('/getRegisteredCompanyCRN', (req, res) => {
	getAllCompanyCRNs.execute()
			.then((users) => {
				console.log('users',users);
				const result = {
					status: 'success',
					message: 'users',
					users: users
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});



app.listen(port, () => console.log(`Distributed Pharma App listening on port ${port}!`));