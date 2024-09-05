import {Router} from 'express';

const router = Router();

router.post("/login");
router.post("/logout");
router.get("/signup", (req,res)=>{res.send("Signup page is here")});

export default router;