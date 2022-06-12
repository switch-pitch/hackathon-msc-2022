const Router = require("express").Router
const userController = require("../controllers/user-controller")
const router = new Router()
const { body } = require("express-validator")
const authMiddleware = require("../middlewares/auth-middleware")
const { cloudinary } = require("../utils/cloudinary")


router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration,
)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
// router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh)
router.get("/users", authMiddleware, userController.getUsers)

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      // upload_preset: 'dev_setups',
    })
    res.json({ url: uploadResponse.secure_url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "Something went wrong" })
  }
})


module.exports = router
