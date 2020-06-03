'use strict'

const { CommonModule } = require('../../commonlib/commonModule');

/**
  * Request a new drug on the network
  * @param ctx - The transaction context object
  * @param companyCRN - Company Registration Number 
  * @param drugName - Drug Name
  * @param serialNo - serial Number of the drug
  * @param mfgDate - manufacturing date
  * @param expDate - expiration date
  * @returns
  */

async function addDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN) {

    //create a key for the drug
    let drugKey = CommonModule.makeKey([drugName, serialNo]);

    //check drug already registereds
    let drugInfo = await ctx.drugList.getDrugDetails(drugKey, 'drug')
        .catch(error => console.error(error));
    let drugDetails;

    if (!drugInfo) {

        //get Manufacturer commposite key and validate with transaction invoker
        let manufacturerList = await ctx.registeredCompanyList.getAllUsers()
            .catch(error => console.error(error));
        let manufacturerCompositeKey;
        if (manufacturerList) manufacturerCompositeKey = manufacturerList.find(manufacturer => manufacturer.key.includes(companyCRN));
        if (manufacturerList && manufacturerCompositeKey) {

            //create json object format to store in ledger
            drugDetails = {
                productID: ctx.drugList.getCompositeKey(drugKey),
                name: drugName,
                manufacturer: manufacturerCompositeKey.key,
                expiryDate: expDate,
                manufacturingDate: mfgDate,
                owner: manufacturerCompositeKey.key,
                shipment: []
            }

            //create drug instance and add to ledger
            let drugInstance = CommonModule.createInstance(drugDetails, 'drug');
            await ctx.drugList.addDrug(drugInstance);

            //set addDrug event 
            ctx.stub.setEvent('addDrug', CommonModule.toBuffer(drugInstance));

            // return registered drug details
            return drugDetails;

        }
        else {
            //validate entered manufacturer crn doesn't exist in the ledger
            throw new Error(`Entered CRN ${companyCRN} is not registered as a manufacturer`)
        }
    }
    else {
        throw new Error(`Drug is already registered in the network with ${serialNo} serial number`);
    }

}



module.exports.addDrug = addDrug;