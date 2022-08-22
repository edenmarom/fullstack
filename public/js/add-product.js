$('#addBtn').click(function(){
    const newProductParams =  JSON.stringify({
        name: $('#product-name').val(),
        price: $('#price').val(),
        currency: $('#product-currency').val(),
        description: $('#product-description').val(),
        location: $('#location').val(),   
        category: $('#product-category').val(),
        imgUrl: $('#imgUrl').val(),
        publisherId: userId,
        status: "unsold"
      
    });

    if($('#product-name').val().length > 0 &&
       $('#price').val().length > 0 &&
       $('#product-currency').val().length > 0 &&
       $('#product-category').val().length > 0 &&
       $('#location').val().length > 0 &&
       $('#imgUrl').val().length > 0 &&
       $('#product-description').val().length > 0) {
            $.ajax({
                url: getProductAddr,
                type: 'POST',
                data: newProductParams,
                'contentType': 'application/json',
                'processData': false,
                success: () => {
                    alert("product added successfully")
                    getAllProducts();
                },
                error: (xhr, status, error) => {}});
       }
       else {alert("Please enter all fields")};       
 });
