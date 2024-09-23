const Router = require("koa-router");

const { create, update } = require("../controller/info.controller");

const {
  infoValidate,
  verifyPetInfo,
} = require("../middleware/info.middleware");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/infos" });

// 只有已经登录的管理员用户才有资格管理信息
router.post(
  "/create",
  auth,
  hasAdminPermission,
  infoValidate,
  verifyPetInfo,
  create
);

router.put("/:id", auth, hasAdminPermission, infoValidate, update);

module.exports = router;
