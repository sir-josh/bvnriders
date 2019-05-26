document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById('submitPayment')){
        document.getElementById('submitPayment').addEventListener('click', function(e){
            payWithRave();
            e.preventDefault(); 
        });
    }
});

const API_publicKey = "FLWPUBK_TEST-b312dd234e24512121a50f6184ec328e-X";
        
function payWithRave() {
    var x = getpaidSetup({
        PBFPubKey: API_publicKey,
        customer_email: "user@example.com",
        amount: 2500,
        currency: "NGN",
        txref: "rave-123456",
        subaccounts: [
          {
            id: "RS_6D4CE9C708ADA594D7487D82AA9F7238" // This assumes you have setup your commission on the dashboard.
          }
        ],
        meta: [{
            metaname: "flightID",
            metavalue: "AP1234"
        }],
        onclose: function() {},
        callback: function(response) {
            var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
            console.log("This is the response returned after a charge", response);
            if (
                response.tx.chargeResponseCode == "00" ||
                response.tx.chargeResponseCode == "0"
            ) {                
         
                const appfee = parseFloat(response.data.data.appfee);
                const amount = parseFloat(response.data.data.amount);
                const diff = amount - appfee;
                const netIncome = (diff * 0.1).toFixed(2);
                const driverIncome = (diff - netIncome).toFixed(2);

                let keysToRemove = ['appfee','amount','driverIncome','netIncome'];

                keysToRemove.forEach(k => localStorage.removeItem(k));

                localStorage.setItem('appfee', appfee);
                localStorage.setItem('amount', amount);
                localStorage.setItem('driverIncome', driverIncome);
                localStorage.setItem('netIncome', netIncome);
               
               console.log('payment successful');
               // redirect to a success page
               window.location.replace("rider.success.html");
            } else {
                // redirect to a failure page.
                console.log('payment failed');
            }

            x.close(); // use this to close the modal immediately after payment.
        }
    });
}

if (window.location.href.includes("rider.success.html")){
    document.querySelector('#amountReceived').innerHTML = '&#x20A6;'+ localStorage.getItem('amount');
    document.querySelector('#appFee').innerHTML = '&#x20A6;'+ localStorage.getItem('appfee');
    document.querySelector('#companyNetIncome').innerHTML = '&#x20A6;'+ localStorage.getItem('netIncome');
    document.querySelector('#driverIncome').innerHTML = '&#x20A6;'+ localStorage.getItem('driverIncome');
}
