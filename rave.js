class RaveGateWay{
    constructor(){
        this.secretKey = 'FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X';
    }
    async getUser(bvn){
        const userProfileResponse = await fetch(`https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/${bvn}?seckey=${this.secretKey}`);
    
        const userInfo = await userProfileResponse.json();

        return userInfo;
    }
}