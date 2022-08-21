const publisherAdrress = serverAddr + "publisher/";
const filterAddr = serverAddr + "getProductsWithFilters/";

function getAllProducts() {
    $.ajax({
        url: productsAdress,
        type: 'GET',
        success: (res) => {
            drawProductList(res);   
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });    
}

function drawProductList(res) {
    productList = res;
    $.get(productTemplateAdress, function (template) {
        const templateStr = template.toString();
        const replacedTemplates = productList.map(product => {
            return productFieldReplacement(templateStr, product);
        });
        $("#productList").html(replacedTemplates);
    });
}

function productFieldReplacement(templateStr, product) {
    let temporaryTemplate = templateStr;
    temporaryTemplate = temporaryTemplate.replace('{$name}', product.name);
    temporaryTemplate = temporaryTemplate.replace('{$price}', product.price);
    temporaryTemplate = temporaryTemplate.replace('{$currency}', product.currency);
    temporaryTemplate = temporaryTemplate.replace('{$description}', product.description);
    temporaryTemplate = temporaryTemplate.replace('{$category}', product.category);
    temporaryTemplate = temporaryTemplate.replace('{$status}', product.status);
    temporaryTemplate = temporaryTemplate.replace('{$source}', videoAdress + product.videoUrl);
    temporaryTemplate = temporaryTemplate.replace('{$imgSrc}', product.imgUrl);
    temporaryTemplate = temporaryTemplate.replace('{$productId}', product._id);
    return temporaryTemplate;
}

function buyClick(id){
    console.log("product = " + id);
    console.log("buyer = " + userId);    
    
    $.ajax({
        url: publisherAdrress + id,
        type: 'GET',
        success: (res) => {
            console.log("seller = " + res);
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });  
}

$('#filterBtn').click(function(){
    const filterParameters =  JSON.stringify({
        "minPrice": $('#minPrice').val(),
        "maxPrice": $('#maxPrice').val(),
        "location": $('#location').val(),
        "category": $('#category').val()
    });

    if($('#minPrice').val().length > 0 &&
       $('#maxPrice').val().length > 0 &&
       $('#location').val().length > 0 &&
       $('#category').val().length > 0) {
        $.ajax({
            url: filterAddr,
            type: 'POST',
            data: filterParameters,
            'contentType': 'application/json',
            'processData': false,
            success: (res) => {
                console.log(res);
                drawProductList(res);
            },
            error: (xhr, status, error) => {
                alert("Wrong Credentials. Please register first");
            }
        });
       }
       else {alert("Please enter all filter fields")};

 });

 $('#cancelBtn').click(function(){
   getAllProducts();
});

function main() {
    getAllProducts();   
}
main();