// function initMap() {
//     const uluru = { lat: -25.344, lng: 131.031 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: uluru,
//     });
//     const marker = new google.maps.Marker({
//       position: uluru,
//       map: map,
//     });
// }

// var map;
// function initMap() {
//     console.log("hi");
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }
  
  //window.initMap = initMap;
  //initMap();


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

$(document).ready(() => { 
    initMap();

}); 