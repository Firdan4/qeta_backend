import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID, // Ganti dengan Client ID Anda
  process.env.GMAIL_CLIENT_SECRET, // Ganti dengan Client Secret Anda
  process.env.GMAIL_REDIRECT_URL // atau redirect URI Anda
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN, // Ganti dengan Refresh Token Anda
});

export default oAuth2Client;
