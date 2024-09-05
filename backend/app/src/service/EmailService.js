import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import DistributedLockService from "./DistributedLockService.js";

const client = new SESv2Client();

const WEB_BASE_URL = process.env.WEB_BASE_URL || "http://localhost:8080";
const SES_ARN = process.env.SES_ARN;

class EmailService {
    static async sendEmail({ to, subject, body }) {
        if (!SES_ARN) {
            console.log(`email will be sent to ${to} with subject ${subject} and body ${body}`);
            return { success: true };
        }

        if (!await DistributedLockService.acquireLock(`send-email-${to}`, 60)) {
            return { success: false, message: "Please try later" };
        }

        const params = {
            Content: {
                Simple: {
                    Body: {
                        Html: {
                            Data: body,
                        },
                    },
                    Subject: {
                        Data: subject,
                    },
                },
            },
            Destination: {
                ToAddresses: [to],
            },
            FromEmailAddress: "no-reply@mail.gpbooking.icu",
            FromEmailAddressIdentityArn: SES_ARN,
        }
        const command = new SendEmailCommand(params);
        try {
            await client.send(command);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error sending email" };
        }
    }

    static async sendVerificationEmail({ to, token }) {
        const subject = "Verify your email address";
        const link = `${WEB_BASE_URL}/verify-email?token=${token}`;
        const body = `
            <p>Click the link below to verify your email address:</p>
            <a href="${link}">${link}</a>
        `;
        return EmailService.sendEmail({ to, subject, body });
    }

    static async sendResetPasswordEmail({ to, token }) {
        const subject = "Reset your password";
        const link = `${WEB_BASE_URL}/reset-password?token=${token}`;
        const body = `
            <p>Click the link below to reset your password:</p>
            <a href="${link}">${link}</a>
        `;
        return EmailService.sendEmail({ to, subject, body });
    }

    static async sendInitialPasswordEmail({ to, password }) {
        const subject = "Initial password";
        const body = `
            <p>Your inital password is: ${password}. Please change it.</p>
        `;
        return EmailService.sendEmail({ to, subject, body });
    }
}

export default EmailService;
