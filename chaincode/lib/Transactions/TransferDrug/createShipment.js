'use strict'

const { CommonModule } = require('../../commonlib/commonModule');


/**
  * Request a new shipment order
  * @param ctx - The transaction context object
  * @param buyerCRN - buyer Company Registration Number 
  * @param drugName - Drug Name
  * @param listOfAssets - list drug ids
  * @param transporterCRN - transporter Company Registration Number 
  * @returns
  */
async function createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN) {

    // convert listOfAssets to list
    listOfAssets = listOfAssets.split(',')

    //create shipment key and composite Key
    let shipmentKey = CommonModule.makeKey([buyerCRN, drugName]);

    //check shipment detail exist in ledger or not
    let shipmentDetails = await ctx.shipmentList.getshipmentDetails(shipmentKey, 'shipment')
        .catch(error => console.error(error));
    console.log(shipmentDetails);

    //get order details
    let orderDetails = await ctx.orderList.getOrderDetails(shipmentKey, 'order')
        .catch(error => console.error(error));

    // validate shipment details 
    if (!shipmentDetails) {

        //validate order Exist
        if (orderDetails) {

            //validate listOfAssests length
            if (listOfAssets.length === parseInt(orderDetails.quantity)) {

                //get all drugs from assests

                let drugList = await ctx.drugList.getAllDrugs()
                    .catch(error => console.error(error));
                if (drugList) {

                    //get Transporter composite key
                    let companies = await ctx.registeredCompanyList.getAllUsers()
                        .catch(error => console.error(error));
                    let transporter;
                    if (companies) {
                        transporter = companies.find(company => company.key.includes(transporterCRN));
                    }

                    //list of Assests
                    let assestsCompositeKey = []

                    for (let assest of listOfAssets) {

                        //validate listOfAssests
                        let drugDetails = drugList.find(drug => drug.key.includes(assest));
                        if (drugDetails) {
                            //validate drug owner with seller
                            if (drugDetails.value.owner == orderDetails.seller) {
                                assestsCompositeKey.push(drugDetails.key);
                                drugDetails.value.owner = transporter.key;

                                //create drug instance and update the ledger
                                let drugInstance = CommonModule.createInstance(drugDetails.value, 'drug');
                                await ctx.drugList.updateDrug(drugInstance);
                            }
                            else {
                                throw new Error(`Owner of the drug is not as per the seller of the order`)
                            }
                        }
                        else {
                            throw new Error(`Entered assest ${assest} doesn't exist`)
                        }
                    };

                    //create json object for shipment 
                    let shipmentInfo = {
                        shipmentID: ctx.shipmentList.getCompositeKey(shipmentKey),
                        creator: orderDetails.seller,
                        assets: assestsCompositeKey,
                        transporter: transporter.key,
                        status: 'in-transit',
                        CreatedAt: new Date()
                    }

                    //create shipment instance and add to ledger
                    let shipmentInstance = CommonModule.createInstance(shipmentInfo, 'shipment');
                    await ctx.shipmentList.addshipment(shipmentInstance);

                    //invoke createshipment event
                    ctx.stub.setEvent('createShipment', CommonModule.toBuffer(shipmentInstance));

                    //return shipment details
                    return shipmentInfo;
                }

            }
            else {
                throw new Error(`Number of assests doesn't match with order quantity`)
            }
        }
        else {
            throw new Error(`order details doesn't exist for entered details`)
        }
    }
    else {
        throw new Error(`Enter detail has already shipped`)
    }





}

module.exports.createShipment = createShipment;