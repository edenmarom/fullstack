function getAllProducts() {
    $.ajax({
        url: productsAdress,
        type: 'GET',
        success: (res) => {
            productList=res;
                $.get(productTemplateAdress, function(template) {                    
                    const templateStr = template.toString();
                    const replacedTemplates = productList.map(product => {
                      return productFieldReplacement(templateStr, product);
                });
                $("#productList").html(replacedTemplates);
            });   
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
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
    return temporaryTemplate;
}

function main() {
    getAllProducts();   
}
main();