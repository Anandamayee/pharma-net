'use strict';

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 *
 */
const consumerAddToWallet = require('../addTowallet/consumer_addToWallet');
const manufacturerAddToWallet = require('../addTowallet/manufacturer_addToWallet');
const retailerAddToWallet = require('../addTowallet/retailer_addToWallet');
const transportertAddToWallet = require('../addTowallet/transporter_addToWallet');
const distributorAddToWallet = require('../addTowallet/distributor_addToWallet');

async function addToWallet() {

    // Main try/catch block
    try {
        //set Manufacturer wallet
        await manufacturerAddToWallet.execute('manufacturer');
        //set Distributor wallet
        await distributorAddToWallet.execute('distributor');
        //set Retailer wallet
        await retailerAddToWallet.execute('retailer');
        //set Transporter wallet
        await transportertAddToWallet.execute('transporter');
        //set Consumer wallet
        await consumerAddToWallet.execute('consumer');


    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
        throw new Error(error);
    }
}

module.exports.execute = addToWallet;
