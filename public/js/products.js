function getAllProducts() {
  $.ajax({
    url: productsAddress,
    type: "GET",
    success: (res) => {
      productList = res;
      drawProductList(res, "#productList", productTemplateAddress);
    },
    error: (xhr, status, error) => {
      console.log("Error: " + error);
    },
  });
}

function getSuggestedProducts() {
  $.ajax({
    url: getMostBoughtCategoryAddr + userId,
    type: "GET",
    success: (res) => {
      if (res && res[0] && res[0]._id.Cat.length > 0) {
        getProductsByCategory(res[0]._id.Cat);
      } else {
        $("#suggestedProductList").html("No transaction history... :(");
      }
    },
    error: (xhr, status, error) => {
      console.log("Error: " + error);
    },
  });
}

function getProductsByCategory(category) {
  $.ajax({
    url: getAllProductsByCategoryAddr + category[0],
    type: "GET",
    success: (res) => {
      drawProductList(res, "#suggestedProductList", productTemplateAddress);
    },
    error: (xhr, status, error) => {
      console.log("Error: " + error);
    },
  });
}

function drawProductList(list, htmlTag, templateAddr) {
  $.get(templateAddr, function (template) {
    const templateStr = template.toString();
    const replacedTemplates = list.map((product) => {
      return productFieldReplacement(templateStr, product);
    });
    $(htmlTag).empty();
    $(htmlTag).html(replacedTemplates);
  });
}

function productFieldReplacement(templateStr, product) {
  let temporaryTemplate = templateStr;
  temporaryTemplate = temporaryTemplate.replaceAll("{$name}", product.name);
  temporaryTemplate = temporaryTemplate.replaceAll("{$price}", product.price);
  temporaryTemplate = temporaryTemplate.replaceAll(
    "{$currency}",
    product.currency
  );
  temporaryTemplate = temporaryTemplate.replace(
    "{$description}",
    product.description
  );
  temporaryTemplate = temporaryTemplate.replace(
    "{$category}",
    product.category
  );
  temporaryTemplate = temporaryTemplate.replace("{$status}", product.status);
  temporaryTemplate = temporaryTemplate.replace("{$imgSrc}", product.imgUrl);
  temporaryTemplate = temporaryTemplate.replace("{$productId}", product._id);
  temporaryTemplate = temporaryTemplate.replace(
    "{$location}",
    product.location
  );
  return temporaryTemplate;
}

function buyClick(id) {
  $.ajax({
    url: getStatusByIdAddr + id,
    type: "GET",
    success: (res) => {
      if (res === "sold") {
        alert("The product has been sold :(");
      } else {
        buyProduct(id);
      }
    },
    error: (xhr, status, error) => {
      console.log("Error: " + error);
    },
  });
}

function buyProduct(id) {
  let transactionParams = {};
  $.ajax({
    url: publisherAddress + id,
    type: "GET",
    success: (res) => {
      transactionParams = JSON.stringify({
        seller: res,
        buyer: userId,
        product: id,
        create_date: new Date(),
      });
      postTransaction(transactionParams);
      updateProductStatus(id);
    },
    error: (xhr, status, error) => {
      console.log("Error: " + error);
    },
  });
}

function postTransaction(transactionParams) {
  $.ajax({
    url: createTransactionAddr,
    type: "POST",
    data: transactionParams,
    contentType: "application/json",
    processData: false,
    success: () => {
      alert("Product bought succesfully");
      getAllProducts();
    },
    error: () => {
      alert("Error please try again.");
    },
  });
}

function updateProductStatus(productId) {
  const updateData = JSON.stringify({
    status: "sold",
  });

  $.ajax({
    url: updateProductStatusAddr + productId,
    type: "PUT",
    data: updateData,
    contentType: "application/json",
    processData: false,
    success: () => {},
    error: () => {
      alert("Error update.");
    },
  });
}

$("#filterBtn").click(function () {
  const filterParameters = JSON.stringify({
    minPrice: $("#minPrice").val(),
    maxPrice: $("#maxPrice").val(),
    location: $("#location").val(),
    category: $("#category").val(),
  });

  if (
    $("#minPrice").val().length > 0 &&
    $("#maxPrice").val().length > 0 &&
    $("#location").val().length > 0 &&
    $("#category").val().length > 0
  ) {
    $.ajax({
      url: filterAddr,
      type: "POST",
      data: filterParameters,
      contentType: "application/json",
      processData: false,
      success: (res) => {
        drawProductList(res, "#productList", productTemplateAddress);
      },
      error: () => {
        alert("Wrong Credentials. Please register first");
      },
    });
  } else {
    alert("Please enter all filter fields");
  }
});

$("#cancelBtn").click(function () {
  getAllProducts();
});

$("#searchBtn").click(function () {
  let result = findInValues(productList, $("#search-input").val());
  drawProductList(result, "#productList", productTemplateAddress);
});

function findInValues(arr, value) {
  value = String(value).toLowerCase();
  return arr.filter((o) =>
    Object.entries(o).some((entry) =>
      String(entry[1]).toLowerCase().includes(value)
    )
  );
}

function main() {
  getAllProducts();
  getSuggestedProducts();
}
main();
