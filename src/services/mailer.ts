import nodemailer from "nodemailer";
import oAuth2Client from "./oauth2Client";
import dotenv from "dotenv";
dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async (emailOptions: EmailOptions) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL, // Ganti dengan email Anda
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken?.token || "",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // Ganti dengan email Anda
      to: emailOptions.to,
      subject: emailOptions.subject,
      text: emailOptions.text,
      html: `<p>${emailOptions.text}</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};
