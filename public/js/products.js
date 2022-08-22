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
    
    $.ajax({
        url: getStatusByIdAddr + id,
        type: 'GET',
        success: (res) => {
            if(res=="sold"){
                alert("The product has been sold :(");
            } else {
                buyProduct(id);  
            }
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });  
}

function buyProduct(id) {
    let transactionParams = {};
    $.ajax({
        url: publisherAdrress + id,
        type: 'GET',
        success: (res) => {
            transactionParams = JSON.stringify({
                "seller": res,
                "buyer": userId,
                "product": id,
                "create_date": new Date()
            });
            postTransaction(transactionParams);
            updateProductStatus(id);
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });
}

function postTransaction(transactionParams) {
    $.ajax({
        url: createTransactionAddr,
        type: 'POST',
        data: transactionParams,
        'contentType': 'application/json',
        'processData': false,
        success: (res) => {
            loadHomeContent(myAccountHtmlAddr,myAccountCssAddr);    
        },
        error: (xhr, status, error) => {
            alert("Error please try again.");
        }
    });
}

function updateProductStatus(productId) {
    const updateData =  JSON.stringify({
        "status": "sold"
    });

    $.ajax({
        url: updateProductStatusAddr + productId,
        type: 'PUT',
        data: updateData,
        'contentType': 'application/json',
        'processData': false,
        success: (res) => {},
        error: (xhr, status, error) => {
            alert("Error update.");
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

// $('#searchBtn').click(function(){
//     let result = findInValues(productList)
// });

// function findInValues(arr, value) {
//     value = String(value).toLowerCase();
//     return arr.filter(o =>
//       Object.entries(o).some(entry =>
//         String(entry[1]).toLowerCase().includes(value)
//       )
//     );
// }

function main() {
    getAllProducts();   
}
main();