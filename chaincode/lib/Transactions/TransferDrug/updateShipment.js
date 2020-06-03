'use strict'

const { CommonModule } = require('../../commonlib/commonModule')


/**
  * Request a  shipment update
  * @param ctx - The transaction context object
  * @param buyerCRN - buyer Company Registration Number 
  * @param drugName - Drug Name
  * @param transporterCRN - transporter Company Registration Number
  * @returns
  */

async function updateShipment(ctx, buyerCRN, drugName, transporterCRN) {

    //create shipment key
    let shipmentKey = CommonModule.makeKey([buyerCRN, drugName]);

    //get transporter compposite key from ledger
    let registeredCompanies = await ctx.registeredCompanyList.getAllUsers()
        .catch(error => console.error(error));
    let transporter;
    let buyer;

    //get  buyer details
    if (registeredCompanies) {
        transporter = registeredCompanies.find(data => data.key.includes(transporterCRN));
        buyer = registeredCompanies.find(data => data.key.includes(buyerCRN));
    }
    //get shipment details from ledger
    let shipmentDetails = await ctx.shipmentList.getshipmentDetails(shipmentKey, 'order')
        .catch(error => console.error(error));

    // validate shipment details
    if (shipmentDetails) {

        //validate transporter in the ledger
        if (buyer && transporter && transporter.value.companyID === shipmentDetails.transporter) {
            shipmentDetails.status = 'delivered';
            shipmentDetails['UpdateAt'] = new Date();

            //create shipment instance and update to ledger
            let shipmentInstance = CommonModule.createInstance(shipmentDetails, 'shipment');
            await ctx.shipmentList.updateshipment(shipmentInstance);

            //Invoke updateshipment event
            ctx.stub.setEvent('updateshipment', CommonModule.toBuffer(shipmentInstance));

            let assetsList = [];
            for (let assest of shipmentDetails.assets) {
                //create key for assests and fetch details from the ledger
                let drugKey = CommonModule.makeKey(ctx.drugList.splitCompositeKey(assest));
                let drugDetails = await ctx.drugList.getDrugDetails(drugKey,'drug')
                    .catch(error => console.error(error));
                if (drugDetails) {
                    drugDetails.owner = buyer.key;
                    drugDetails.shipment.push(shipmentDetails.shipmentID);

                    //create drug instance and update to ledger
                    let drugInstance = CommonModule.createInstance(drugDetails, 'drug');
                    await ctx.drugList.updateDrug(drugInstance);

                    assetsList.push(drugDetails);
                }
                else {
                    throw new Error(`Entered assest ${drugDetails.serialNo} detail doesn't present in the ledger`)
                }
            };

            //return assests details 
            return {shipmentDetails:shipmentDetails,assets:assetsList};

        }
        else {
            throw new Error(`Entered transporter ${transporterCRN} doesn't match with shipment request transportor details`);
        }

    }
    else {
        throw new Error(`Shipment request doesn't exist with entered request details`)
    }


}

module.exports.updateShipment = updateShipment;