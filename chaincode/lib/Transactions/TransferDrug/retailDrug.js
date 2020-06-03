'use strict'

const { CommonModule } = require('../../commonlib/commonModule');

/**
  * Request a drug retail to customer
  * @param ctx - The transaction context object
  * @param retailerCRN - retailer Company Registration Number 
  * @param drugName - Drug Name
  * @param serialNo - drug serial number
  * @param customerAadhar - customer Aadhar 
  * @returns
  */

async function retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar) {

    //create drug key and get details
    let drugKey = CommonModule.makeKey([drugName, serialNo]);
    let drugDetails = await ctx.drugList.getDrugDetails(drugKey,'drug')
        .catch(error => console.error(error));

    //fetch all retailer details from the ledger
    let reatailers = await ctx.registeredCompanyList.getAllUsers()
        .catch(error => console.error(error));

    //filter retailer composite key by retailerCRN 
    let retailer;
    if (reatailers) {
        retailer = reatailers.find(user => user.key.includes(retailerCRN));
    }

    if (drugDetails) {

        //validate the drug owner
        if (drugDetails.owner == retailer.key) {
            drugDetails.owner = customerAadhar;

            //create drug instance and update to ledger
            let drugInstance = CommonModule.createInstance(drugDetails, 'drug');
            await ctx.drugList.updateDrug(drugInstance);

            //invoke retailDrug event
            ctx.stub.setEvent('retailDrug', CommonModule.toBuffer(drugInstance));

            //return updated drugdetails
            return drugDetails;
        }
        else {
            throw new Error('Only owner of the product is allowed to sell')
        }
    }
    else {
        throw new Error(`Entered drug ${drugName} & ${serialNo} details are not registered`);
    }
}


module.exports.retailDrug = retailDrug;