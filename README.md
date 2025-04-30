# Resume Autofill Assistant

A Chrome extension that extracts information from your resume and intelligently autofills online job application forms, speeding up the job search process.

---

## Features

- Upload your resume once — autofill everywhere  
- Quickly fill out job applications on supported websites  
- Intelligent parsing of contact details, education, and work experience  
- Stores your resume securely in your browser  
- No data is sent to external servers  

---

## Installation

1. Download or clone this repository:

   `git clone https://github.com/yourusername/resume-autofill.git`

2. Open Chrome and go to `chrome://extensions/`

3. Enable Developer mode (top right)

4. Click Load unpacked and select the extension folder you cloned

5. Click the extension icon and upload your resume to get started

---

## Project Structure

`resume-autofill-assistant/`  
`│`  
`├── icons/`              # Extension icons (16x, 48x, 128x)  
`├── popup.html`          # UI for uploading resume  
`├── popup.js`            # Handles file input and parsing  
`├── content.js`          # Injected into pages to autofill forms  
`├── background.js`       # Background logic (optional messaging, future use)  
`└── manifest.json`       # Extension config and permissions

---

## Permissions

The extension uses the following Chrome permissions:

- `storage` — Save your resume in browser storage  
- `activeTab` — Access the current tab when the user clicks the extension  
- `scripting` — Inject form-filling logic into job application pages
