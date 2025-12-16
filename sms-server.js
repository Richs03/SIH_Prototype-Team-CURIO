// SMS Alert Server - Twilio Integration
// Water Quality & Health Monitoring System

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const PORT = 3000;

// Twilio Configuration
const accountSid = 'AC7a5a80f744797b9df4ad1ca553099dd3';
const authToken = '634373b880061ed0c2e913e87a189ea7';
const twilioPhone = '+19706958905';

const client = twilio(accountSid, authToken);

// Middleware
app.use(cors());
app.use(express.json());

// SMS Sending Endpoint
app.post('/send-sms', async (req, res) => {
    try {
        const { recipients, message, language, location, alertType } = req.body;

        console.log('\n=== SMS Alert Request ===');
        console.log(`Alert Type: ${alertType}`);
        console.log(`Location: ${location}`);
        console.log(`Language: ${language}`);
        console.log(`Recipients: ${recipients.length} phone numbers`);
        console.log(`Message: ${message.substring(0, 50)}...`);
        console.log('========================\n');

        if (!recipients || recipients.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No recipients provided'
            });
        }

        const results = [];
        const errors = [];

        // Send SMS to each recipient
        for (const phoneNumber of recipients) {
            try {
                const messageResult = await client.messages.create({
                    body: message,
                    from: twilioPhone,
                    to: phoneNumber
                });

                results.push({
                    phoneNumber: phoneNumber,
                    status: messageResult.status,
                    sid: messageResult.sid
                });

                console.log(`✓ SMS sent to ${phoneNumber} - SID: ${messageResult.sid}`);
            } catch (error) {
                errors.push({
                    phoneNumber: phoneNumber,
                    error: error.message
                });
                console.error(`✗ Failed to send to ${phoneNumber}: ${error.message}`);
            }
        }

        console.log(`\n✓ Successfully sent: ${results.length}`);
        console.log(`✗ Failed: ${errors.length}\n`);

        res.json({
            success: true,
            sent: results.length,
            failed: errors.length,
            results: results,
            errors: errors
        });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'running',
        service: 'SMS Alert Server',
        provider: 'Twilio',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   SMS Alert Server - RUNNING          ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\n🚀 Server started on http://localhost:${PORT}`);
    console.log(`📱 Twilio Phone: ${twilioPhone}`);
    console.log(`🔐 Account SID: ${accountSid.substring(0, 10)}...`);
    console.log(`✅ Ready to send SMS alerts\n`);
    console.log('📝 Endpoints:');
    console.log(`   POST http://localhost:${PORT}/send-sms`);
    console.log(`   GET  http://localhost:${PORT}/health\n`);
    console.log('⚠️  IMPORTANT - Trial Account Notes:');
    console.log('   • Verify recipient phone numbers at:');
    console.log('     https://console.twilio.com/us1/develop/phone-numbers/manage/verified');
    console.log('   • Messages will include "Sent from your Twilio trial account"');
    console.log('   • Can only send to verified numbers');
    console.log('   • Upgrade account to remove restrictions\n');
    console.log('🌐 Connect your frontend to: http://localhost:3000/send-sms\n');
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error.message);
});
