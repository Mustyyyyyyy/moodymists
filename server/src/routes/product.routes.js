const router = require("express").Router();
const ctrl = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

router.post("/", auth, role("admin"), ctrl.create);
router.put("/:id", auth, role("admin"), ctrl.update);
router.delete("/:id", auth, role("admin"), ctrl.remove);

module.exports = router;