function initGraph(htmlTag, url) {
    var margin = {top: 30, right: 30, bottom: 70, left: 60}, width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    var svg = d3.select(htmlTag)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    d3.csv(url, function (data) {
        var x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(function (d) {
                return Object.values(d)[1];
            }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        var y = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return x(Object.values(d)[1]);
            })
            .attr("y", function (d) {
                return y(d.productsCount);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return height - y(d.productsCount);
            })
            .attr("fill", "#69b3a2");
    });
}

function getMyProductsToSale() {
    $.ajax({
        url: getMyProductsToSaleListAddr + userId,
        type: 'GET',
        success: (res) => {
            drawProductList(res, "#myProductsToSaleList", myProductTemplateAddress)
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });
}

function deleteProductClick(id) {
    $.ajax({
        url: deleteProductAddr + id,
        type: 'DELETE',
        success: () => {
            alert("Product deleted successfully.");
            getMyProductsToSale();
        },
        error: (xhr, status, error) => {
            console.log("Error: " + error);
        }
    });
}

function main() {
    let purchaseTag = "#purchaseGraph";
    let salesTag = "#salesGraph";
    let purchaseUrl = serverAddr + "purchaseCountPerMonthCSV/" + userId;
    let salesUrl = serverAddr + "salesCountPerMonthCSV/" + userId;
    initGraph(purchaseTag, purchaseUrl);
    initGraph(salesTag, salesUrl);
    getMyProductsToSale()
}
main();


