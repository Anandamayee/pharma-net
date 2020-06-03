'use strict'

const {CommonModule}=require('../commonlib/commonModule');

class RegisteredCompanyList {
    constructor(ctx) {
        this.ctx = ctx;
        this.name = 'org.pharma-network.pharmanet.lists.registeredCompanyList';
    }

    /**
	 * Returns the Company model stored in blockchain identified by this key
	 * @param companyKey
	 * @returns {Promise<Company>}
	 */
    async getCompanyDetails(companyKey,className){
        let compositeKey=this.getCompositeKey(companyKey);
        let responseBuffer=await this.ctx.stub.getState(compositeKey);
        return CommonModule.fromBuffer(responseBuffer,className);
    }
    
    /**
	 * Adds a Company model to the blockchain
	 * @param companyObject {Company}
	 * @returns {Promise<void>}
	 */
    async addCompany(companyObject){
        let requestBuffer=CommonModule.toBuffer(companyObject);
        await this.ctx.stub.putState(companyObject.companyID,requestBuffer);
    }
    /**
	 * Return  company CompositeKey
	 * @param companyKey 
	 * @returns string
	 */
	getCompositeKey(companyKey) {
		return this.ctx.stub.createCompositeKey(this.name, companyKey.split('::'));
    }
    /**
	 * Return  company keys
	 * @param companyCompositeKey 
	 * @returns string
	 */
	splitCompositeKey(companyCompositeKey) {
		return this.ctx.stub.splitCompositeKey(companyCompositeKey).attributes.map(attribute=>attribute.replace(/"/g,""));
    }
    /**
	 * Get All registered  users  from the blockchain
	 * @returns Array<{key,value}>
	 */
	async getAllUsers(){
		let iterator=await this.ctx.stub.getStateByPartialCompositeKey(this.name,[]);		
		let result;
		let allUsers=[]
		do{
			result=await iterator.next();
			console.log(result);
			if(result && result.value && result.value.value.toString()) 
			{
				let key=result.value.key;
				let value=JSON.parse(result.value.value.toString('utf8'));
				allUsers.push({key:key,value:value})
			}
		}
		while(!result.done);
		return allUsers;
	}
}

module.exports=RegisteredCompanyList;