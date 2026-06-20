const { setGlobalOptions } = require("firebase-functions");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");
const axios = require("axios");

setGlobalOptions({ maxInstances: 10 });

const resendApiKey = defineSecret("RESEND_API_KEY");
const telegramToken = defineSecret("TELEGRAM_TOKEN");
const telegramChatId = defineSecret("TELEGRAM_CHAT_ID");

exports.sendBookingEmail = onDocumentCreated(
  {
    document: "bookings_v2/{bookingId}",
    secrets: [resendApiKey, telegramToken, telegramChatId],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }

    const data = snapshot.data();

    const name = data.customerName || "N/A";
    const phone = data.phone || "N/A";
    const email = data.email || "N/A";
    const vehicle = `${data.vehicleType || "N/A"} — ${data.vehicleModel || "N/A"}`;
    const bookingType = data.bookingType || "N/A";
    const service = data.serviceName || "N/A";
    const selectedPackage = data.selectedPackage || "N/A";
    const date = data.date || "N/A";
    const time = data.time || "N/A";
    const notes = data.notes || "None";

    // ─── Resend Email ───────────────────────────────────────────
    const resend = new Resend(resendApiKey.value());
    try {
      const res = await resend.emails.send({
        from: "bookings@down2detail.ca",
        to: "down2detail.ca@gmail.com",
        subject: `New Booking — ${name} (${date} at ${time})`,
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Vehicle:</strong> ${vehicle}</p>
          <p><strong>Booking Type:</strong> ${bookingType}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Package:</strong> ${selectedPackage}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Notes:</strong> ${notes}</p>
        `,
      });
      logger.info("Email sent successfully", res);
    } catch (error) {
      logger.error("Error sending email", error);
    }

    // ─── Telegram Notification ──────────────────────────────────
    const message =
      `🚗 *New Booking — Down2Detail*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `🚙 *Vehicle:* ${vehicle}\n` +
      `📋 *Type:* ${bookingType}\n` +
      `🔧 *Service:* ${service}\n` +
      `📦 *Package:* ${selectedPackage}\n` +
      `📅 *Date:* ${date}  |  🕐 *Time:* ${time}\n` +
      `📝 *Notes:* ${notes}`;

    try {
      await axios.post(
        `https://api.telegram.org/bot${telegramToken.value()}/sendMessage`,
        {
          chat_id: telegramChatId.value(),
          text: message,
          parse_mode: "Markdown",
        },
      );
      logger.info("Telegram notification sent successfully");
    } catch (error) {
      logger.error("Error sending Telegram notification", error);
    }
  },
);
