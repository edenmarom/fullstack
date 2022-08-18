//const serverAddr = "http://localhost:8080/";
const credentialAdrress =serverAddr + 'checkCredentials';

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 $('#loginButton').click(function(){
    $.ajax({
        url: credentialAdrress,
        type: 'POST',
        data: JSON.stringify({
            "userName": $('#username').value,
            "password": $('#password').value
        }),
        'contentType': 'application/json',
        'processData': false,
        success: (res) => {
            alert(res.status);
            //$("#content").html(res);
        },
        error: (xhr, status, error) => {
            alert(status);
        }
    });
 });


