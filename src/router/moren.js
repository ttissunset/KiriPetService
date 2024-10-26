const Router = require("koa-router");

const router = new Router({ prefix: "/" });

const { moren } = require("../middleware/info.middleware");

router.get("/", moren);

module.exports = router;
