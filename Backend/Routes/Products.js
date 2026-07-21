import express from "express";
import { Products } from "../Controllers/Products.js";
const router = express.Router();

router.get("/AllProducts/", Products);

export default router;