const { Router } = require("express");
const authController = require("../controllers/authControllers");
const router = Router();
const crudController = require("../controllers/crudControllers");
const pemeriksaanControllers = require("../controllers/pemeriksaanControllers");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
// const statusController = require("../controllers/statusController");

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

// CRUD
router.post("/data", requireAuth, crudController.postCustomer);
router.get("/data/list", requireAuth, crudController.getCustomer);
router.post(
  "/pemeriksaan",
  requireAuth,
  pemeriksaanControllers.postPemeriksaan
);
router.get(
  "/pemeriksaan/list",
  requireAuth,
  pemeriksaanControllers.getCustomer
);
router.get("/status", requireAuth, pemeriksaanControllers.getStatus);
router.get("/view/:id", requireAuth, crudController.view);
router.get("/edit/:id", requireAuth, crudController.edit);
router.put("/edit/:id", requireAuth, crudController.editPost);
router.delete("/edit/:id", requireAuth, crudController.deleteCustomer);
router.delete("/data/list/delete", requireAuth, crudController.deleteCustomer);
// router.get("/status", statusController.getStatus);

// pemeriksaan
router.get("/viewPemeriksaan/:id", requireAuth, pemeriksaanControllers.view);
router.get("/editPemeriksaan/:id", requireAuth, pemeriksaanControllers.edit);
router.put(
  "/editPemeriksaan/:id",
  requireAuth,
  pemeriksaanControllers.editPost
);
router.get("/kota", requireAuth, pemeriksaanControllers.getKotaISR);
router.get("/", requireAuth, pemeriksaanControllers.getStatusISR);
router.delete(
  "/editPemeriksaan/:id",
  requireAuth,
  pemeriksaanControllers.deleteCustomer
);

router.post('/filter', crudController.filterCustomers);
router.post('/search', crudController.searchCustomers);
router.post('/searchPemeriksaan',pemeriksaanControllers.searchpemeriksaandata);
router.post('/filterpemeriksaan',pemeriksaanControllers.filterpemeriksaandata);
module.exports = router;
