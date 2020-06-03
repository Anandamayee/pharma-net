'use strict'

const { CommonModule } = require('../../commonlib/commonModule');


/**
  * Request a new purchase order
  * @param ctx - The transaction context object
  * @param buyerCRN - buyer Company Registration Number 
  * @param drugName - Drug Name
  * @param sellerCRN - seller Company Registration Number 
  * @param quantity - drug quantity
  * @returns
  */
async function createPO(ctx, buyerCRN, sellerCRN, drugName, quantity) {

    //check for valid buyer and seller 
    let registeredCompanies = await ctx.registeredCompanyList.getAllUsers()
        .catch(error => console.error(error));

    // validate buyer and seller details
    if (registeredCompanies) {
        let buyer = registeredCompanies.find(buyer => buyer.key.includes(buyerCRN));
        let seller = registeredCompanies.find(seller => seller.key.includes(sellerCRN));
        if (!buyer || !seller) {

            // validate valid buyer and seller details 
            throw new Error(`Please enter a valid ${buyerCRN} OR ${sellerCRN}`);
        }
        else {
            //fetch buyer seller details from ledger

            let buyerKey = CommonModule.makeKey(ctx.registeredCompanyList.splitCompositeKey(buyer.key))
            let buyerDetails = await ctx.registeredCompanyList.getCompanyDetails(buyerKey, 'company')
                .catch(error => console.error(error));
            let sellerKey = CommonModule.makeKey(ctx.registeredCompanyList.splitCompositeKey(seller.key))
            let sellerDetails = await ctx.registeredCompanyList.getCompanyDetails(sellerKey, 'company')
                .catch(error => console.error(error));

            //validate entered buyer and seller
            if (buyerDetails && sellerDetails) {

                //compare buyer & seller hyrarchy

                if (parseInt(buyerDetails.hierarchyKey) - parseInt(sellerDetails.hierarchyKey) == 1) {

                    //create order key
                    let orderKey = CommonModule.makeKey([buyerCRN, drugName]);

                    //create order json object to store in ledger
                    let orderDetails = {
                        poID: ctx.orderList.getCompositeKey(orderKey),
                        drugName: drugName,
                        quantity: quantity,
                        buyer: buyerDetails.companyID,
                        seller: sellerDetails.companyID,
                        CreatedAt: new Date()
                    }

                    //Create Order Instance and add to ledger
                    let orderInsatnce = CommonModule.createInstance(orderDetails, 'order');
                    await ctx.orderList.orderDrug(orderInsatnce);

                    //invoke createPO event
                    ctx.stub.setEvent('createPO', CommonModule.toBuffer(orderInsatnce));

                    //return registered order details
                    return orderDetails;
                }
                else {
                    throw new Error('You can buy drugs in hyrarchical order e.g : Retailer can buy from Distributors only');
                }
            }
            else {
                throw new Error('Please enter valid buyer/seller details')
            }
        }
    }

}

module.exports.createPO = createPO;