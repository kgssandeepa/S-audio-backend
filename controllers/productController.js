import product from "../models/product.js";
import { isitAdmin } from "./usercontroller.js";

export function addproduct(req, res) {
    console.log(req.user)

    if (!req.user) {
        res.status(401).json({
            massage: "please login and try again"
        })
        return
    }
    if (req.user.role != "admin") {
        res.status(403).json({
            massage: "you are not authorized to perform this action"
        })
        return
    }
    const data = req.body;
    const newproduct = new product(data);
    newproduct.save()
        .then(() => {
            res.json({ massage: "product added succesfully" });
        })
        .catch((error) => {
            res.staus(500).json({ error: "product addition failed" });
        })
}

export async function getProducts(req, res) {

    try {
        if (isitAdmin(req)) {
            const products = await product.find();
            res.json(products);
            return;
        } else {
            const products = await product.find({ availability: true });
            res.json(products);
            return;
        }


    } catch (e) {
        res.status(500).json({
            massage: "failed to get products"
        })
    }
}
export async function updateproduct(req, res) {

    try {
        if (isitAdmin(req)) {

            const key = req.params.key;
            const data = req.body

            await product.updateOne({ key: key }, data)
            res.json({
                massage: "product updated succesfully"
            });
            return;



        } else {
            res > staus(403).json({
                massage: "you are not authorized to perform this"
            })

        }
    } catch (e) {
        res.status(500).json({
            massage: "failed to get products"
        })
    }
}

export async function deleteProduct(req, res) {
    try {
        if (isitAdmin(req)) {
            const key = req.params.key;
            await product.deleteOne({ key: key })
            res.json({
                massage:"product deleted successfully"
            })

        } else {
            res.status(403).json({
                massage: "you are not authorized to perform this action"
            })
            return;
        }
    } catch (e) {
        res.status(500).json({
            massage: "failed to delete product"
        })
    }

}