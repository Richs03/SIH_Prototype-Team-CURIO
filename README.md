# SIH_Prototype-Team-CURIO
My prototype is a web-based application designed to assist in the early detection and reporting of water-borne diseases at the community level. It allows health workers or users to fill a simple questionnaire related to symptoms, water sources, and hygiene conditions, even in low-connectivity areas. The collected data is processed to generate a basic health risk assessment, which can be shared with ASHA workers or health authorities for timely action. The system supports local languages to ensure accessibility and aims to improve disease monitoring, awareness, and rapid response in rural and underserved regions.
Technologies Used in Our Prototype (SIH 2025)

Frontend:
HTML, CSS, JavaScript – used to build a responsive web interface for filling questionnaires and displaying health risk information.

Web Application Architecture:
A browser-based web app that can run on low-end devices without requiring installation.

Backend / Data Handling:
Firebase (Firestore / Realtime Database) – used for storing user responses, managing reports, and synchronizing data when internet connectivity is available.

Authentication (Optional):
Firebase Authentication – for secure login of health workers (if enabled).

Offline Support:
Local storage / IndexedDB – to temporarily store data in low or no internet conditions before syncing.

Multilingual Support:
Translation APIs (e.g., Bhashini / Sarvam / NLLB integration) – to support local and North-Eastern Indian languages.
