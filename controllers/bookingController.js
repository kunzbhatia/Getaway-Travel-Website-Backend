import Booking from "../models/Booking.js";
import nodemailer from "nodemailer";

const sendConfirmationEmail = async (userEmail, tourName) => {
  try {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: userEmail,
        subject: "Booking Confirmation",
        text: `Dear ${userEmail},\n\nYour booking for ${tourName} Tour Package from Getway Tours and Travel has been confirmed.This is Your Digital Invoice.\n\nThank you for choosing our service!`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
} catch (error) {
    console.error('Error sending email:', error);
    throw error;
}
};

// Create new Booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    sendConfirmationEmail(savedBooking.userEmail, savedBooking.tourName);
    res.status(201).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Single Booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "successful",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// Get All Booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: "successful",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};