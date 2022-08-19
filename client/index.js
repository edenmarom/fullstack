const serverAddr = "http://localhost:8080/";
const loginAddress = serverAddr+ "html/login.html"
const loginCss = serverAddr + "css/login.css"

function main(){
    loadView(loginAddress, loginCss);
}

main();

function loadView(htmlAddr, cssAddr) { //get request for files
    
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

function insertAdData(ad) {
    $(document).ready(() => {  
        $("#header").html(ad.header);
        $("p").empty();
        ad.text = ad.text.slice(0, txtLimit);
        ad.text.forEach(line => {
            $("p").append('<div>' + line + '</div>');
        });
        $(".images-list").empty();
        ad.images = ad.images.slice(0, imgLimit);
        ad.images.forEach(img => {
            $(".images-list").append('<img alt="Avtar" src="' + imgAddr + img + '">');
        });
    });
}

function loadAd(ad) {
    console.log("load ad number " + ad.id);
    console.log("duration: " + ad.duration + " ms");
    $(document).ready(() => { 
        $.ajax({
            url: templateAddr + ad.template,
            type: 'GET',
            success: (res) => {
                $(document).ready(() => {  
                    $('#currentAd').html(res);
                    insertAdData(ad);
                });
            },
            error: (xhr, status, error) => {
                console.log("Error: " + error);
            }
        });    
    });
}


