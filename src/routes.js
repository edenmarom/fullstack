import { createRequire } from "module";
import path from 'path'
import express from "express";
import { fileURLToPath } from 'url';
import { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getGroupbyCategory,
    getProductsWithFilters,
    getPublisherByProductId
} from "./controllers/product-controller.js";
import { 
    checkCredentials,
    createUser  
} from "./controllers/user-controller.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const router = express.Router();

router.use('/css',express.static(path.join(__dirname, '/../public/css')));
router.use('/js',express.static(path.join(__dirname, '/../public/js')));
router.use('/html',express.static(path.join(__dirname, '/../public/html')));
router.use('/vids',express.static(path.join(__dirname, '/../public/vids')));

router.get('/products', getAllProducts);
router.post('/createProduct', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/groupByCategory', getGroupbyCategory);
router.post('/getProductsWithFilters', getProductsWithFilters);
router.get('/publisher/:id', getPublisherByProductId);

router.post('/checkCredentials', checkCredentials);
router.post('/createUser', createUser);

export default router;
