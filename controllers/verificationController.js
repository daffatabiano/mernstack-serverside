import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Customer from '../models/customerModel.js';
import jwt from 'jsonwebtoken';

export const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generate a random 6-digit number
};

export const sendSms = async (phone, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: `+${phone}@vtext.com`,
    subject: 'OTP Verification',
    html: `<p>Verification code: ${otp}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'OTP Verification - Restaurant Management System',
    html: `
    <h3>Hello ${email?.split('@')[0]},</h3>
    <p>Don't share your OTP code with anyone. It is important to keep this code confidential to ensure the security of your account</p>
    <br/>
    <p>Verification code: <strong>${otp}</strong></p>
    <br/>
    <p>If your not request this code, please contact our support team immediately</p>
    <p>Thank you.</p>
    <br/>
    <p>Best regards,</p>
    <p>Restaurant Management System</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOTP = async (req, res) => {
  const { phone, email, method } = req.body;

  try {
    const otp = generateVerificationCode();
    const expirations = Date.now() + 5 * 60 * 1000; // 5 minutes
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    await Customer.findOneAndUpdate(
      { $or: [{ phone }, { email }] },
      { otp: hashedOtp, otpExpiration: expirations },
      { upsert: true, new: true }
    );

    if (method === 'sms') {
      if (!phone)
        return res.status(400).json({ message: 'Phone number is required' });
      await sendSms(phone, otp);
    } else if (method === 'email') {
      if (!email) return res.status(400).json({ message: 'Email is required' });
      await sendEmail(email, otp);
    } else {
      return res.status(400).json({ message: 'Invalid method' });
    }

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', err });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, email, otp } = req.body;

  try {
    const user = await Customer.findOne({
      $or: [{ phone }, { email }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    if (user.otp !== hashedOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    await Customer.findOneAndUpdate(
      { $or: [{ phone }, { email }] },
      { otp: null, otpExpiration: null },
      { upsert: true, new: true }
    ).select('+email');
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: 'OTP verified successfully',
      token: token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
