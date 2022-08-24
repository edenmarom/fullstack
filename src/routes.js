import { createRequire } from "module";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { transactionsRouter } from "./routers/transactions-router.js";
import { productRouter } from "./routers/product-router.js";
import { userRouter } from "./routers/user-router.js";
import { 
    salesCountPerMonthCSV,
    purchaseCountPerMonthCSV  
} from "./controllers/transaction-controller.js";
import fetch, { Headers } from "node-fetch";
import { getAllLocations } from "./controllers/location-controller.js";
import { getMostBoughtCategoryQuery } from "./db-queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const router = express.Router();

router.use("/css", express.static(path.join(__dirname, "/../public/css")));
router.use("/js", express.static(path.join(__dirname, "/../public/js")));
router.use("/html", express.static(path.join(__dirname, "/../public/html")));
router.use("/vids", express.static(path.join(__dirname, "/../public/vids")));

router.get('/purchaseCountPerMonthCSV/:id', purchaseCountPerMonthCSV);
router.get('/salesCountPerMonthCSV/:id', salesCountPerMonthCSV);
router.use("/products", productRouter);
router.use("/transactions", transactionsRouter);
router.use("/user", userRouter);
router.get("/getAllLocations", getAllLocations);
router.get("/currency", currencyApi);
router.get("/mostBoughtCategory/:id", getMostBoughtCategory);

export default router;

function currencyApi(req, res) {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "N7w2RCppioLla9SnhcngymZTs9An99zN");
    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };
    fetch(
        "https://api.apilayer.com/exchangerates_data/convert?to=ILS&from=USD&amount=1",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            res.send(result);
        })
        .catch((error) =>{
            console.log("error", error);
            res.send("Error in convertion webservice")
        });
}

async function getMostBoughtCategory (req, res, next) {
    const id = req.params.id;
    const category = await getMostBoughtCategoryQuery(id);
    category ? res.send(category) : res.status(404).send(`user [id = ${id}] not found.`);
    await next();
}
