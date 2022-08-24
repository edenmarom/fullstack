let map;
function initMap() {
    $.ajax({
        url: getLocationAddr,
        type: 'GET',
        success: (res) => {
            const myLatLng = { lat: +(res[0].lat), lng: +(res[0].long) };
            const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 15,
              center: myLatLng,
            });
            new google.maps.Marker({
              position: myLatLng,
              map,
              title: "Our Store",
            });
         },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
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
    $(document).ready(function() {
        initMap();
    });
}

main();