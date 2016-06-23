var cb = new ClearBlade();
var isAuthenticated = false;

function SignIn(event){
    event.preventDefault();
    var deviceName = document.getElementById("deviceName").value;
    var activeKey = document.getElementById("activeKey").value;
    var platformUrl = document.getElementById("platformUrl").value;
    var systemKey = document.getElementById("systemKey").value;
    //var systemSecret = document.getElementById("systemSecret").value;
    var signInData = {"deviceName":deviceName, "activeKey":activeKey};
    console.log(JSON.stringify(signInData));
    var client;
    var endpoint = "/api/v/2/devices/"+systemKey+"/auth";
    var url_action=platformUrl+endpoint;
    console.log(url_action);
    if(window.XMLHttpRequest)
    {
        client=new XMLHttpRequest();
        //alert("request Obj");
    }
    else
    {
        client=new ActiveXObject("Microsoft.XMLHTTP");
        //alert("request Obj2");
    }
    client.onreadystatechange=function()
    {
        if(client.readyState==4){
            if (client.status==200)
            {
                document.getElementById("result").innerHTML=client.responseText;
                isAuthenticated = true;
                document.getElementById("statusImage").src = "img/online.png";
                toastr.success('Authentication Successful!', 'Success', { closeButton: true });
            }else{
                console.log(client.responseText);
                toastr.error(client.responseText, 'Error', { closeButton: true });
            }
        }
    };
    client.open("POST",url_action,true);
    client.setRequestHeader("Content-type", "application/json");
    client.setRequestHeader("ClearBlade-Systemkey", systemKey);
    //client.setRequestHeader("ClearBlade-Systemsecret", systemSecret);
    //client.setRequestHeader("Clearblade-usertoken","5kZ6YFTLqb1EmLUjVr-MPl8S125pXE-gNfC1OX8Pv6860IzLsQZsVoBwLbqz6oH5isT0ebXkcP9pBVM1")
    //curl -X POST https://staging.clearblade.com/api/v/2/devices/f887dcf20ac88ade9da9c193facd01/auth -d '{"deviceName":"fan", "deviceToken":"AmeyaChikodi"}' -H 'ClearBlade-Systemkey:f887dcf20ac88ade9da9c193facd01' -H 'ClearBlade-Systemsecret:F887DCF20AFEE5908181DFC4FEB701' -H 'Clearblade-usertoken:5kZ6YFTLqb1EmLUjVr-MPl8S125pXE-gNfC1OX8Pv6860IzLsQZsVoBwLbqz6oH5isT0ebXkcP9pBVM1'
    //curl -X POST https://rtp.clearblade.com/api/v/2/devices/acd4cbf60a9eadefb5b5bdcee7cd01/auth -d '{"deviceName":"fan", "activeKey":"AmeyaChikodi"}' -H 'ClearBlade-Systemkey:acd4cbf60a9eadefb5b5bdcee7cd01' -H 'ClearBlade-Systemsecret:ACD4CBF60AF2F8F7B294C7CDE274'
    client.send(JSON.stringify(signInData));
    //acd4cbf60a9eadefb5b5bdcee7cd01
    //ACD4CBF60AF2F8F7B294C7CDE274
}

var userAuthenticated = function(event){
    if(!isAuthenticated){
        console.log("User not authenticated. Please input correct parameters and click on Auth button.");
        return false;
    }
    return true;
}
