'use strict'

const { Contract } = require('fabric-contract-api');
const AddDrug = require('./lib/Transactions/DrugRegistration/addDrug.js');
const CreatePO = require('./lib/Transactions/TransferDrug/createPO.js');
const CreateShipment = require('./lib/Transactions/TransferDrug/createShipment.js');
const RegisterCompany = require('./lib/Transactions/EntityRegistration/registerCompany.js');
const UpdateShipment = require('./lib/Transactions/TransferDrug/updateShipment.js');
const RetailDrug = require('./lib/Transactions/TransferDrug/retailDrug');
const viewDetails = require('./lib/Transactions/viewLifeCycle/viewDetails');
const { OrganisationRole } = require('./lib/commonlib/commonModule.js');
const ListModule = require('./lib/commonlib/listModule.js');

class PharmaContract extends Contract {

    constructor() {
        // Provide a custom name to refer to this smart contract
        super('org.pharma-network.pharmanet');
    }
    /* ****** All custom functions are defined below ***** */
    // This is a basic user defined function used at the time of instantiating the smart contract
    // to print the success message on console
    async instantiate(ctx) {
        console.log('Pharma Smart Contract Instantiated');
    }


	// Built in method used to build and return the context for this smart contract on every transaction invoke
    createContext() {
        return new ListModule();
    }


    async addDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN) {

        //check functionality invoked by manufacturer
        if (ctx.clientIdentity.getMSPID() == 'manufacturerMSP') {
            return await AddDrug.addDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN);
        }
        else {
            throw new Error('You need to register as a manufacturer to access this functionality');
        }
    }
    async createPO(ctx, buyerCRN, sellerCRN, drugName, quantity) {


        //check functionality invoked by retailer/distributoor
        console.log(ctx.clientIdentity.getMSPID());
        
        if (ctx.clientIdentity.getMSPID() == 'distributorMSP' || ctx.clientIdentity.getMSPID() == 'retailerMSP') {
            return await CreatePO.createPO(ctx, buyerCRN, sellerCRN, drugName, quantity);
        }
        else {
            throw new Error('Only registered Distributor and Retailers can access this functionality.');
        }
    }
    async createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN) {
        return CreateShipment.createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN);
    }
    async registerCompany(ctx, companyCRN, companyName, Location, organisationRole) {

        //check for valid organization  role
        let organisationRoleType = organisationRole[0].toUpperCase() + organisationRole.slice(1).toLowerCase()
        if (OrganisationRole.hasOwnProperty(organisationRoleType)) {
            return await RegisterCompany.registerCompany(ctx, companyCRN, companyName, Location, organisationRoleType);
        }
        else {
            throw new Error("Please select a valid organization role among ['Manufacturer','Distributor','Transporter','Retailer'] to  register.")
        }
    }
    async updateShipment(ctx, buyerCRN, drugName, transporterCRN) {

        //check functionality invoked by transporter
        if (ctx.clientIdentity.getMSPID() == 'transporterMSP') {
            return UpdateShipment.updateShipment(ctx, buyerCRN, drugName, transporterCRN);
        }
        else {
            throw new Error('Only registered transporters can access this functionality.');
        }
    }
    async retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar) {

        //check functionality invoked by retailer
        if (ctx.clientIdentity.getMSPID() == 'retailerMSP') {
            return await RetailDrug.retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar);
        }
        else {
            throw new Error('Only registered Retailers can access this functionality.');
        }
    }
    async viewHistory(ctx, drugName, serialNo) {
        return await viewDetails.viewHistory(ctx, drugName, serialNo);
    }
    async viewDrugCurrentState(ctx, drugName, serialNo) {
        return await viewDetails.viewDrugCurrentState(ctx, drugName, serialNo);
    }

    //additional functions for UI Implementaion
    async getAllDrugList(ctx) {
        let drugList = await ctx.drugList.getAllDrugs()
            .catch(error => console.error(error));
        if (drugList) {
            return drugList;
        }
        else {
            throw new Error('No result found');
        }
    }
    async getAllUserList(ctx) {
        let userList = await ctx.registeredCompanyList.getAllUsers()
            .catch(error => console.error(error));
        if (userList) {
            return userList.map(user=>user.value.companyCRN);
        }
        else {
            throw new Error('No result found');
        }
    }

    //get user role
    async getUserRole(ctx, companyCRN) {
        let userList = await ctx.registeredCompanyList.getAllUsers()
            .catch(error => console.error(error));
        let userDetails;
        
        if (userList) userDetails = userList.find(user => user.key.includes(companyCRN));
        if (userDetails) {
        console.log(userList,"   ",userDetails);

            return userDetails.value.organisationRole;
        }
        else {
            throw new Error('No result found');
        }
    }
}
module.exports = PharmaContract;