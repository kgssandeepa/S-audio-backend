import inquiry from "../models/inquiry.js";
import { isitCustomer } from "./usercontroller.js";

export async function addinquiry(req, res) {
    try {

        if (isitCustomer(req)) {
            const data = req.body
            data.email = req.user.email
            data.phone = req.user.phone

            let id = 0;

            console.log(" 1 =============");

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
                massage: "inquiry added successfully",
                id: response.id
            })

        }

    } catch (e) {


        res.status(500).json({
            massage: "failed to add inquiry"
        })
    }

}