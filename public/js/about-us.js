function initMap() {
    $(document).ready(() => { 
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
        console.log(map)
        console.log(document.getElementById('map'))
    });
}  

function getExchangeRate() {
    $.ajax({
        url: getExchangeRateAddr,
        type: 'GET',
        success: (res) => {
            $("#currency").html(JSON.parse(res).result);
            
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });
}

function main() {
    getExchangeRate();
}
main();