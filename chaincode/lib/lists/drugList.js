'use strict'

const { CommonModule } = require('../commonlib/commonModule');

class DrugList {
    constructor(ctx) {
        this.ctx = ctx;
        this.name = 'org.pharma-network.pharmanet.lists.drugList';
    }


    /**
	 * Returns the Drug model stored in blockchain identified by this key
	 * @param drugKey
	 * @returns {Promise<Drug>}
	 */
    async getDrugDetails(drugKey, className) {
        let drugCompositeKey = this.getCompositeKey(drugKey);
        let responseBuffer = await this.ctx.stub.getState(drugCompositeKey);
        return CommonModule.fromBuffer(responseBuffer, className);
    }

    /**
	 * Adds a Drug model to the blockchain
	 * @param drugObject {Drug}
	 * @returns {Promise<void>}
	 */
    async addDrug(drugObject) {
        let requestBuffer = CommonModule.toBuffer(drugObject);
        await this.ctx.stub.putState(drugObject.productID, requestBuffer);
    }

    /**
	 * Update a Drug model to the blockchain
	 * @param drugObject {Drug}
	 * @returns {Promise<void>}
	 */
    async updateDrug(drugObject) {
        let requestBuffer = CommonModule.toBuffer(drugObject);
        await this.ctx.stub.putState(drugObject.productID, requestBuffer);
    }

    /**
	 * Return  Drug CompositeKey
	 * @param drugKey 
	 * @returns string
	 */
    getCompositeKey(drugKey) {
        return this.ctx.stub.createCompositeKey(this.name, drugKey.split('::'));
	}
	/**
	 * Return  drug keys
	 * @param drugCompositeKey 
	 * @returns string
	 */
	splitCompositeKey(drugCompositeKey) {
		return this.ctx.stub.splitCompositeKey(drugCompositeKey).attributes.map(attribute=>attribute.replace(/"/g,""));
    }

    /**
	 * Get All registered  drug  from the blockchain
	 * @returns Array<{key,value}>
	*/
	async getDrugHistory(drugKey){
		let iterator = await this.ctx.stub.getHistoryForKey(drugKey);
		let result;
		let allHistory=[]
		do{
			result=await iterator.next();
			console.log(result);
			if(result && result.value && result.value.value.toString()) 
			{
				let tx_id=result.value.tx_id;
				let value=JSON.parse(result.value.value.toString('utf8'));
				allHistory.push({tx_id:tx_id,history:value})
			}
		}
		while(!result.done);
    	return allHistory;
  }
  /**
	 * Get All registered  drug  from the blockchain
	 * @returns Array<{key,value}>
	 */
	async getAllDrugs(){
		let iterator=await this.ctx.stub.getStateByPartialCompositeKey(this.name,[]);		
		let result;
		let allDrugs=[]
		do{
			result=await iterator.next();
			console.log(result);
			if(result && result.value && result.value.value.toString()) 
			{
				let key=result.value.key;
				let value=JSON.parse(result.value.value.toString('utf8'));
				allDrugs.push({key:key,value:value})
			}
		}
		while(!result.done);
		return allDrugs;
	}
	
}

module.exports = DrugList;