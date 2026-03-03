const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.post("/create-admin", ctrl.createAdmin);

router.post("/login", ctrl.login);
router.get("/me", auth, role("admin"), ctrl.me);

module.exports = router;