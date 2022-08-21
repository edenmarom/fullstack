const productListHtmlAddr = serverAddr + "html/product-list.html";
const productListCssAddr = serverAddr + "css/product-list.css";
const myAccountHtmlAddr = serverAddr + "html/my-account.html";
const myAccountCssAddr = serverAddr + "css/my-account.css";
const aboutUsHtmlAddr = serverAddr + "html/about-us.html";
const aboutUsCssAddr = serverAddr + "css/about-us.css";
const addProductHtmlAddr = serverAddr + "html/add-product.html";
const addProductCssAddr = serverAddr + "css/add-product.css";

const videoAdress = serverAddr + "vids/";
const productsAdress = serverAddr +'products';
const productTemplateAdress = serverAddr +'html/product.html';
let productList = [];

function createCanvas() {
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "50px fantasy";
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "black");
    gradient.addColorStop("0.5", "white");
    gradient.addColorStop("1.0", "black");
    ctx.fillStyle = gradient;
    ctx.fillText("Share&Buy", 10, 65);
    
}

function main() {
    createCanvas(); 
    loadHomeContent(productListHtmlAddr,productListCssAddr); 
}
main();

function loadHomeContent(htmlAddr,cssAddr) { 
    $.ajax({
        url: htmlAddr,
        type: 'GET',
        success: (res) => {
            $("#homeContent").empty();
            $("#homeContent").html(res);
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });
   
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssAddr;
    link.media = 'all';
    $("head").append(link);
}

$('#myAccount').click(function(){
    loadHomeContent(myAccountHtmlAddr,myAccountCssAddr);    
});

$('#aboutUs').click(function(){
    loadHomeContent(aboutUsHtmlAddr,aboutUsCssAddr);    
});

$('#home').click(function(){
    loadHomeContent(productListHtmlAddr,productListCssAddr);    
});

$('#addProduct').click(function(){
    loadHomeContent(addProductHtmlAddr,addProductCssAddr);    
});