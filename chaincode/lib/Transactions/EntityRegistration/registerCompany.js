'use strict'

const { CommonModule, OrganisationRole } = require('../../commonlib/commonModule');

/**
  * Request a new company on the network
  * @param ctx - The transaction context object
  * @param companyCRN - Company Registration Number 
  * @param companyName - company name
  * @param Location - company location
  * @param organisationRole - company role
  * @returns
  */
async function registerCompany(ctx, companyCRN, companyName, Location, organisationRole) {
     //create a key for the company
     let companyKey = CommonModule.makeKey([companyCRN, companyName]);

     //check company already exist or not
     let companyInfo = await ctx.registeredCompanyList.getCompanyDetails(companyKey, 'company')
          .catch(error => console.error(error));

     //validate company already exist or not 
     if (!companyInfo) {

          //create company json object to store in the ledger
          let companyDetails = {
               companyID: ctx.registeredCompanyList.getCompositeKey(companyKey),
               name: companyName,
               location: Location,
               organisationRole: organisationRole,
               hierarchyKey: organisationRole != 'Transporter' ? OrganisationRole[organisationRole] : null
          }

          //create comapany instance and add to ledger
          let companyInstance = CommonModule.createInstance(companyDetails, 'company');
          await ctx.registeredCompanyList.addCompany(companyInstance);

          //invoke registerCompany event
          ctx.stub.setEvent('registerCompany', CommonModule.toBuffer(companyInstance));

          //return company details added to ledger
          return companyDetails;
     }
     else {
          throw new Error("You have already registered.")
     }

}

module.exports.registerCompany = registerCompany;