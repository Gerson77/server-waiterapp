import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategory";
import { createProducts } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import multer from "multer";
import path from "node:path";
import { listproductsByCategory } from "./app/useCases/categories/listproductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrder";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { deleteProduct } from "./app/useCases/products/deleteProduct";
import { deleteCategory } from "./app/useCases/categories/deleteProduct";
import { listUsers } from "./app/useCases/users/listUsers";
import { createUser } from "./app/useCases/users/createUser";
import { deleteUser } from "./app/useCases/users/deleteUser";
import { login } from "./app/useCases/auth/login";
import { ensureAuthenticate } from "./app/shared/middleware/auth";
import { saveTokenNotification } from "./app/useCases/notifications/saveTokenNotification";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List Categories
router.get("/categories", ensureAuthenticate, listCategories);

// Create category
router.post("/categories", ensureAuthenticate, createCategories);

// Delete Category
router.delete("/category/:categoryId", ensureAuthenticate, deleteCategory);

// List products
router.get("/products", ensureAuthenticate, listProducts);

// Create product
router.post(
  "/products",
  upload.single("image"),
  ensureAuthenticate,
  createProducts
);

// Get products by category
router.get(
  "/categories/:categoryId/products",
  ensureAuthenticate,
  listproductsByCategory
);

// Delete product
router.delete("/product/:productId", ensureAuthenticate, deleteProduct);

// List orders
router.get("/orders", ensureAuthenticate, listOrders);

// Create orders
router.post("/orders", ensureAuthenticate, createOrder);

// Change order status
router.patch("/orders/:orderId", ensureAuthenticate, changeOrderStatus);

// Delete/cancel order
router.delete("/orders/:orderId", ensureAuthenticate, cancelOrder);

// List Users
router.get("/users", ensureAuthenticate, listUsers);

router.post("/users", ensureAuthenticate, createUser);

router.delete("/user/:userId", ensureAuthenticate, deleteUser);

// Authentication
router.post("/login", login);

router.post('/registerPushToken/:userId', saveTokenNotification)
