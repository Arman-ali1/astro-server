import asyncHandler from "../utilities/asyncHandler.js"

// import {ApiError} from "./../utilities/apiError.js"
import dotenve from "dotenv";
dotenve.config({ path: "./.env" });
import Nodemailer from "nodemailer";

const sendmail = asyncHandler(async (req, res) => {
    const { email, } = req.body;
    // const email = "armnsrn1732000@gmail.com";

    try {

        const transporter = Nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email With React And Nodejs",
            html: `<body>
            <div class="container">
                <h1>Online Bill Trinity Info..</h1>
                <div class="bill-details">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>${email}</th>
                        </tr>
                        <tr>
                            <td>Item 1</td>
                            <td style="padding-left: 20px">2</td>
                            <td>$10.00</td>
                        </tr>
                        <tr>
                            <td>Item 2</td>
                            <td style="padding-left: 20px">1</td>
                            <td>$15.00</td>
                        </tr>
                        <!-- Add more rows for additional items -->
                    </table>
                </div>
                <div class="total">
                    <p><strong>Total: $25.00</strong></p>
                </div>
            </div>
        </body>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
                res.status(500).json({ status: 500, error: error });
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({ status: 201, info: info });
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ status: 500, error: error });
    }

})




export {sendmail}

