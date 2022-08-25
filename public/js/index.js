const serverAddr = "http://localhost:8080/";
const loginAddress = serverAddr+ "html/login.html"
const loginCss = serverAddr + "css/login.css"

function loadView(htmlAddr, cssAddr) {
    $.ajax({
        url: htmlAddr,
        type: 'GET',
        success: (res) => {
            $("#content").html(res);
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

function main(){
    loadView(loginAddress, loginCss);
}

main();


