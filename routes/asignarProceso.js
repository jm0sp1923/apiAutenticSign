import express from "express";

const router = express.Router()

router.post("/cargarProcesso", async function (req,res) {
 let body =   req.body

 console.log(body)

 return res.status(200).json({body})
})

export default router;