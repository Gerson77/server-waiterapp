import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategory";
import { createProducts } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import multer from "multer";
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
import { getNotification } from "./app/useCases/notifications/getNotification";
import { removeTokenNotification } from "./app/useCases/notifications/removeTokenNotification";
import { updatedNotification } from "./app/useCases/notifications/updatedNotification";
import { refreshAuth } from "./app/useCases/auth/refresh";

export const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Apenas imagens são permitidas."));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
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
router.post("/products", ensureAuthenticate, upload.single("image"), createProducts);

// Get products by category
router.get("/categories/:categoryId/products", ensureAuthenticate, listproductsByCategory);

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
router.get('/users', ensureAuthenticate, listUsers)

router.post('/users', ensureAuthenticate, createUser)

router.delete('/user/:userId', ensureAuthenticate, deleteUser)

// Authentication
router.post('/login', login)

// RefreshToken
router.post('/refresh-token', refreshAuth)

// Save Notification push
router.post('/registerPushToken/:userId', ensureAuthenticate,saveTokenNotification)

// Remove Notification push
router.put('/unregisterPushToken/:userId', removeTokenNotification)

// List Notification
router.get('/notifications/:employeeId', ensureAuthenticate, getNotification)

// Update status and read notification
router.put('/notifications/:notificationId', ensureAuthenticate, updatedNotification)

