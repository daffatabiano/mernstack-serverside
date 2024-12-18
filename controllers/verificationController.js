import twilio from 'twilio';
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_ACCOUNT, TWILIO_VERIFY_SERVICE_SID } =
  process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_ACCOUNT);

export const sendOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verfications.create({ to: phone, channel: 'sms' });

    res.status.send({
      success: true,
      statusCode: 200,
      message: 'OTP sent successfully',
      sid: verification.sid,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: 'Something went wrong',
      error,
    });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: code });
    if (verificationCheck.status === 'approved') {
      return res.status(200).send({
        success: true,
        statusCode: 200,
        message: 'OTP verified successfully',
      });
    } else {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: 'Invalid OTP',
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: 'Something went wrong',
      error,
    });
  }
};
