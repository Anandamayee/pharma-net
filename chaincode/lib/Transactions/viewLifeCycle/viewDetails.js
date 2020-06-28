'use strict'

const { CommonModule } = require('../../commonlib/commonModule');



/**
  * Request drug entire history
  * @param ctx - The transaction context object
  * @param drugName - Drug Name
  * @param serialNo - Drug serial number
  * @returns
  */
 
async function viewHistory(ctx, drugName, serialNo) {
    //create drug Key
    let drugKey = CommonModule.makeKey([drugName, serialNo]);
    let compositeKey = ctx.drugList.getCompositeKey(drugKey);

    //get Drug History
    let drugHistory = await ctx.drugList.getDrugHistory(compositeKey)
        .catch(error => console.error(error))
    if (drugHistory && drugHistory.length!=0) {
        return drugHistory;
    }
    else {
        throw new Error("Entered drug deatils doesn't exist")
    }

}

/**
  * Request current state of the drug
  * @param ctx - The transaction context object
  * @param drugName - Drug Name
  * @param serialNo - Drug serial number
  * @returns
  */

async function viewDrugCurrentState(ctx, drugName, serialNo) {
    //create drug Key
    let drugKey = CommonModule.makeKey([drugName, serialNo]);

    //get Drug Current State
    let drugDetails = await ctx.drugList.getDrugDetails(drugKey,'drug')
        .catch(error => console.error(error))
    if (drugDetails) {
        return drugDetails;
    }
    else {
        throw new Error("Entered drug deatils doesn't exist")
    }

}

module.exports.viewHistory = viewHistory;
module.exports.viewDrugCurrentState = viewDrugCurrentState;