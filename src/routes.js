import { createRequire } from "module";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { transactionsRouter } from "./routers/transactions-router.js";
import { productRouter } from "./routers/product-router.js";
import { checkCredentials, createUser } from "./controllers/user-controller.js";
import { 
    salesCountPerMonthCSV,
    purchaseCountPerMonthCSV  
} from "./controllers/transaction-controller.js";
import fetch, { Headers } from "node-fetch";

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
router.post("/checkCredentials", checkCredentials);
router.post("/createUser", createUser);
router.get("/currency", (req, res) => {
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
      console.log(result);
      res.send(result);
    })
    .catch((error) => console.log("error", error));
});

export default router;
