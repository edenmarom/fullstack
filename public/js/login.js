const credentialAdrress = serverAddr + "user/checkCredentials";
let userId = "";
const homeAddr = serverAddr + "html/home.html";
const homecss = serverAddr + "css/home.css";
const createUserAddress = serverAddr + "user/createUser";

$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

$("#loginButton").click(function (e) {
  e.preventDefault();
  const loginData = JSON.stringify({
    userName: $("#username").val(),
    password: $("#password").val(),
  });
 
$.ajax({
    url: credentialAdrress,
    type: "POST",
    data: loginData,
    contentType: "application/json",
    processData: false,
    success: (res) => {
      userId = res[0]._id;
      loadView(homeAddr, homecss);
    },
    error: (xhr, status, error) => {
      alert("Wrong Credentials. Please register first");
    },
  });
});

$("#registerButton").click(function () {
  const regData = JSON.stringify({
    userName: $("#regname").val(),
    password: $("#regpass").val(),
    mail: $("#email").val(),
  });

  $.ajax({
    url: createUserAddress,
    type: "POST",
    data: regData,
    contentType: "application/json",
    processData: false,
    success: (res) => {
      userId = res._id;
      loadView(homeAddr, homecss);
    },
    error: (xhr, status, error) => {
      alert("something went wrong try again");
    },
  });
});
