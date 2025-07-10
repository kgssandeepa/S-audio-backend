import inquiry from "../models/inquiry.js";
import { isitAdmin, isitCustomer } from "./usercontroller.js";

export async function addinquiry(req, res) {
    try {

        if (isitCustomer(req)) {
            const data = req.body
            data.email = req.user.email
            data.phone = req.user.phone

            let id = 0;


            const inquiries = await inquiry.find
                ().sort({ id: -1 }).limit(1);

            if (inquiries.length == 0) {

                id = 1;
            } else {
                id = inquiries[0].id + 1;
            }
            data.id = id;
            const newinquiry = new inquiry(data);


            const response = await newinquiry.
                save();

            res.json({
                message: "inquiry added successfully",
                id: response.id

            })

        }

    } catch (e) {


        res.status(500).json({
            message: "failed to add inquiry"
        })
    }

}

export async function getinquiries(req, res) {

    try {
        if (isitCustomer(req)) {
            const inquiries = await inquiry.find({ email: req.user.email });
            res.json(inquiries);
            return;

        } else if (isitadmin(req)) {
            const inquiries = await inquiry.find();
            res.json(inquiries);
        } else {
            res.status(403).json({
                message: "you are not authorized to perform this action"
            })
            return;
        }
    } catch (e) {
        res.status(500).json({
            message: "failed to get inquiries"
        })
    }
}

export async function deleteinquiry(req, res) {

    try {
        if (isitCustomer(req)) {
            const id = req.params.id;

            await inquiry.deleteOne({ id: id })
            res.json({
                message: "inquiry deleted successfully"
            })
            return;
        } else if (isitCustomer(req)) {
            const id = req.params.id;

            const inquiry = await inquiry.findone({ id: id });
            res.status(404).json({
                message: "inquiry not found"
            })
            return;
        } else {
            if (inquiry.email == req.user.email) {
                await inquiry.deleteOne({ id: id })
                res.json({
                    message: "inquiry deleted successfully"
                })
                return;
            } else {
                res.status(403).json({
                    message: "you are not authorized to perform this action"
                })
                return;
            }
        }


    } catch (e) {
        res.status(500).json({
            message: "failed to delete inquiry"
        })

    }
}

export async function updateinquiry(req, res) {

    try {
        if (isitAdmin(req)) {
            const id = req.params.id;
            const data = req.body;

            await inquiry.updateOne({ id: id }, data)
            res.json({
                message: "inquiry updated successfully"
            })
        } else if (isitCustomer(req)) {
            const id = req.params.id;
            const data = req.body;

            const inquiry = await inquiry.findone({ id: id });
            if (inquiry == null) {
                res.status(404).json({
                    message: "inquiry not found"
                })
                return;
            } else {
                if (inquiry.email == req.user.email) {
                    await inquiry.updateOne({ id: id }, {message:data.message})
                    res.json({
                        message: "inquiry updated succesfully"
                    })
                    return;
                } else {
                    res.status(403).json({
                        message: "you are not authorized to perform this action"
                    })
                    return;
                }
            }

        }else{
            res.status(403).json({
                message:"you are not authorized to perform this action"
            })
        }

    } catch (e) {
        res.status(500).json({
            message: "failed to update inquiry"
        })
    }

}


