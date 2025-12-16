# SMS Alert System Integration Guide

## 🚀 Quick Start

Your SMS alert system is now integrated with Node.js backend! Follow these steps to start sending SMS alerts.

### Prerequisites
- ✅ Node.js installed
- ✅ npm dependencies installed (express, cors, twilio)
- ✅ Twilio account credentials configured

---

## 📋 Setup Instructions

### Step 1: Start the Backend Server

Open a terminal in your project folder and run:

```bash
node sms-server.js
```

You should see:
```
╔════════════════════════════════════════╗
║   SMS Alert Server - RUNNING          ║
╚════════════════════════════════════════╝

🚀 Server started on http://localhost:3000
📱 Twilio Phone: +19706958905
✅ Ready to send SMS alerts
```

**Keep this terminal open** - the server needs to run continuously.

---

### Step 2: Open Your Application

1. Open `index.html` in your browser (language selection page)
2. Select your preferred language
3. Click "Continue to App" to go to `Final.html`

---

### Step 3: Send SMS Alerts

1. Navigate to the **Alerts** section in the application
2. Click on any **"Send SMS Alert"** button
3. A modal will open with:
   - Alert location and type
   - Language selection (English/Hindi)
   - Recipient selection (Villagers, Health Workers, Leaders)
   - SMS preview
   - SMS gateway selection

4. Click **"Send SMS Alert Now"**
5. The system will:
   - Connect to the Node.js backend
   - Send SMS via Twilio
   - Show success/failure status

---

## 🔧 Backend Configuration

### Current Twilio Configuration

The backend is configured with your Twilio credentials in `sms-server.js`:

```javascript
const accountSid = 'AC7a5a80f744797b9df4ad1ca553099dd3';
const authToken = '634373b880061ed0c2e913e87a189ea7';
const twilioPhone = '+19706958905';
```

### API Endpoints

1. **Send SMS**
   - URL: `POST http://localhost:3000/send-sms`
   - Body:
     ```json
     {
       "recipients": ["+919876543210", "+918809640031"],
       "message": "Your alert message",
       "language": "english",
       "location": "Bijaipur",
       "alertType": "Water Contamination",
       "gateway": "twilio"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "sent": 2,
       "failed": 0,
       "results": [
         {
           "phoneNumber": "+919876543210",
           "status": "queued",
           "sid": "SM..."
         }
       ]
     }
     ```

2. **Health Check**
   - URL: `GET http://localhost:3000/health`
   - Response:
     ```json
     {
       "status": "running",
       "service": "SMS Alert Server",
       "provider": "Twilio",
       "timestamp": "2025-12-08T..."
     }
     ```

---

## 📱 Phone Number Configuration

### Testing with Twilio Trial Account

⚠️ **Important**: Twilio trial accounts can only send to **verified phone numbers**.

To verify phone numbers:
1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/verified
2. Click "Add Verified Caller ID"
3. Enter the phone number (with country code, e.g., +919876543210)
4. Complete the verification process

### Current Test Numbers

The system is configured with these test numbers in `Final.html`:
```javascript
['+917987489225', '+918809640031', '+919876543210', '+919876543211']
```

**To use your own numbers**: Edit the `getRecipientPhoneNumbers()` function in `Final.html` (around line 7140).

---

## 🎨 Frontend Integration Details

### Changes Made to `Final.html`

1. **Backend Connection**:
   - Changed API URL to: `http://localhost:3000/send-sms`
   - Added proper headers: `Content-Type` and `Accept`
   - Improved error handling for connection issues

2. **Status Checking**:
   - Added `checkSMSBackendStatus()` function
   - Runs automatically when page loads
   - Checks backend health at `http://localhost:3000/health`

3. **Error Handling**:
   - Detects when backend is not running
   - Shows helpful console messages
   - Displays user-friendly error messages

4. **Success Feedback**:
   - Shows number of messages sent
   - Displays message SIDs for tracking
   - Provides detailed console logs

---

## 🔍 Troubleshooting

### Issue: "Server Not Running" Error

**Solution**: Start the backend server
```bash
node sms-server.js
```

### Issue: "Failed to fetch" Error

**Causes**:
- Backend not running on port 3000
- CORS issue (already handled with cors middleware)
- Firewall blocking localhost connections

**Solution**:
1. Verify server is running
2. Check console for error messages
3. Make sure port 3000 is available

### Issue: "Failed to send SMS"

**Causes**:
- Invalid phone number format
- Phone number not verified (trial account)
- Twilio account issues
- Invalid credentials

**Solution**:
1. Verify phone numbers in Twilio console
2. Check Twilio account balance
3. Verify credentials in `sms-server.js`
4. Check server console for detailed error

### Issue: Backend Crashes

**Solution**: Check for:
- Invalid Twilio credentials
- Network connectivity issues
- Check console for stack traces

---

## 📊 Monitoring and Logs

### Backend Logs

When SMS is sent, you'll see:
```
=== SMS Alert Request ===
Alert Type: Water Contamination
Location: Bijaipur
Language: english
Recipients: 4 phone numbers
Message: ⚠️ ALERT: Water contamination...
========================

✓ SMS sent to +917987489225 - SID: SM...
✓ Successfully sent: 4
✗ Failed: 0
```

### Frontend Logs

Open browser console (F12) to see:
```
✓ SMS Backend Connected: SMS Alert Server
  Provider: Twilio
  Status: running

SMS Delivery Report:
- Sent: 4
- Failed: 0
- Message SIDs: ['SM...', 'SM...']
```

---

## 🔐 Security Notes

1. **API Keys**: The Twilio credentials are currently hardcoded. For production:
   - Move to environment variables
   - Use `.env` file with `dotenv` package
   - Never commit credentials to version control

2. **CORS**: Currently allows all origins. For production:
   - Restrict to specific domains
   - Add authentication/authorization

3. **Rate Limiting**: Consider adding rate limiting to prevent abuse

---

## 📈 Upgrading Twilio Account

To remove trial limitations:

1. Go to Twilio Console: https://console.twilio.com
2. Add payment method
3. Upgrade account
4. Benefits:
   - Send to any phone number (no verification needed)
   - Remove "trial account" message from SMS
   - Higher sending limits
   - Better deliverability

---

## 🎯 Next Steps

1. **Production Setup**:
   - Move credentials to environment variables
   - Add proper database integration for phone numbers
   - Implement user authentication
   - Add SMS delivery tracking and reporting

2. **Enhanced Features**:
   - Schedule SMS for later delivery
   - SMS templates in multiple languages
   - Delivery reports and analytics
   - Failed message retry logic

3. **Alternative Providers**:
   - MSG91 for India-specific messaging
   - AWS SNS for scalability
   - Fast2SMS for cost-effective option

---

## 📞 Support

If you encounter issues:
1. Check server and browser console logs
2. Verify Twilio account status
3. Ensure all dependencies are installed
4. Check network connectivity

---

**Integration completed successfully! 🎉**

Your SMS alert system is ready to send emergency notifications to villagers.
