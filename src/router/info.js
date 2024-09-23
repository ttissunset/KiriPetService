const Router = require("koa-router");

const { create } = require("../controller/info.controller");

const {
  infoValidate,
  verifyPetInfo,
} = require("../middleware/info.middleware");

const router = new Router({ prefix: "/infos" });

router.post("/create", infoValidate, verifyPetInfo, create);

module.exports = router;
