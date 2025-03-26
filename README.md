WhatsApp Group Maker
A Node.js-based automation tool to create WhatsApp groups and add members using Puppeteer. This project automates the process of logging into WhatsApp Web, creating a group, adding phone numbers, and sending messages.

Table of Contents
Features
Prerequisites
Installation
Usage
API Endpoints
Contributing
License
Features
Automates WhatsApp Web login using QR code.
Creates a WhatsApp group with a specified name.
Adds multiple phone numbers to the group.
Sends a customizable welcome message to the group.
Prerequisites
Before running this project, ensure you have the following installed:

Node.js : Download Node.js
Google Chrome : Puppeteer requires Chrome or Chromium to run.
Git : Download Git
Installation
Clone the repositor

git clone https://github.com/ManjunadhaReddy04/whatsapp-group-maker.git
cd whatsapp-group-maker

npm install

node server.js

The server will start running at http://localhost:3000.

Usage
Open your browser and navigate to http://localhost:3000.
Scan the QR code displayed on the page using your WhatsApp mobile app.
Use the API endpoint /start-process to create a group and add members.


Disclaimer
This tool is intended for educational purposes only. Use it responsibly and ensure you comply with WhatsApp's terms of service.
