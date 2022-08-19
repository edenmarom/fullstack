const product={
"_id":{"$oid":"62f53339391b3c986d32544d"},
"name":"מיקסר חשמלי",
"price":"120",
"currency":"שקל",
"imgUrl":"https://cdn.azrieli.com/Images/f34b1d0e-89ad-4a7c-a0d1-caec3578b6d6/Normal/621d72e8.jpg",
"videoUrl":"mixer.mp4",
"description":"aaa",
"location":"קריית אונו",
"category":"מוצרי חשמל",
"publisherId":"62f9441dd3cf9af2d98b12db",
"__v":{"$numberInt":"0"},
"status":"sold"
};

const viedoAdress = serverAddr + "vids/";

function insertProductData(product) {
    
    $(document).ready(() => {  
        $(".card-title").html(product.name);
        $(".card-text").html(product.description);
        $(".card-price").html(product.price); 
        $(".currency").html(product.currency);
        $(".card-img-top").attr("src",product.imgUrl);
            $(document).ready(() => {  
            var video = document.getElementById('video');
            var source = document.getElementById('source');

            source.setAttribute('src', viedoAdress+product.videoUrl);
            video.load();
            video.play();
        });          
    });
}
insertProductData(product);

