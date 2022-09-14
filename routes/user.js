const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById, read, update } = require("../controllers/user");

router.param("userId", userById);

router.get("/user/:userId", requireSignin, isAuth, read);
router.post("/user/:userId", requireSignin, isAuth, update);
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req,res) => {
    res.json({
        user: req.profile
    });
});

module.exports = router;