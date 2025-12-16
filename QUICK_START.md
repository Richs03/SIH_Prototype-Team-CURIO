# 🚀 Quick Start - SMS Alerts

## Start the Backend (Required!)

### Option 1: Double-click the batch file
```
start-sms-server.bat
```

### Option 2: Run in terminal
```bash
node sms-server.js
```

You should see:
```
╔════════════════════════════════════════╗
║   SMS Alert Server - RUNNING          ║
╚════════════════════════════════════════╝
🚀 Server started on http://localhost:3000
```

**✅ Keep this terminal window open!**

---

## Send SMS from Your App

1. Open `index.html` in browser
2. Select language → Continue
3. Go to **Alerts** section
4. Click **"Send SMS Alert"** button
5. Configure recipients and message
6. Click **"Send SMS Alert Now"**

---

## Test Recipients (Configured)

- +917987489225
- +918809640031
- +919876543210
- +919876543211

⚠️ **Twilio Trial**: Verify numbers at https://console.twilio.com

---

## Troubleshooting

**"Server Not Running" error?**
→ Start the backend: `node sms-server.js`

**SMS not sending?**
→ Verify phone numbers in Twilio Console

**Connection issues?**
→ Check if port 3000 is available

---

## Files Modified

✅ `Final.html` - Connected to backend API
✅ `sms-server.js` - Enhanced error handling
✅ `package.json` - Dependencies configured

---

**Need help?** Check `SMS_INTEGRATION_GUIDE.md` for detailed documentation.
