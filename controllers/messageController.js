// controllers/messageController.js

import messageModel from "../models/messageModol.js";

import nodemailer from 'nodemailer';



async function createMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    const newMessage = new messageModel({ name, email, message });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
       user: 'transportcode2023@gmail.com  ',
       pass: ' hcycpozjyailjeiu',
      },
    });

    var mailOptions = {
      from: 'DERIV RWANDA ',
      
      to:' marquineza10@gmail.com',
    
      subject: ' Acceptance of Software Developer Position at DERIV ',
      text: 'Hey there, it’s our first message sent with Nodemailer 😉 ',
      html: '<b>Hey there! </b><br> hope this email finds you well. I am writing to accept the offer for the Software Developer position at DERIV. I am honored and excited to join the dynamic team at Deriv and contribute to its innovative software development projects.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.messageId);
      }
    });



    await newMessage.save();
    




    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'transportcode2023@gmail.com  ',
        pass: ' hcycpozjyailjeiu',
      },
    });


    res
      .status(200)
      .json({ message: "Message saved successfully", data: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
}
//read all messages
const readAllMessages = async (req, res) => {
  try {
    const response = await messageModel.find({});

    if (response.length == 0) {
      res.status(404).json({
        message: "No data found",
        data: response,
        error: "No data found",
      });
    } else {
      res.status(200).json({
        message: "Retrieved successfully",
        data: response,
        error: null,
      });
    }
  } catch (error) {
    console.log("Error occurred in readAllMessages: ", error);
    res.status(500).json({
      message: "Error occurred",
      error: error,
      data: null,
    });
  }
};
export { createMessage, readAllMessages };
