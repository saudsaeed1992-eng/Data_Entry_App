/**
 * MERCHANT KYC UPDATE FORM — GOOGLE SHEETS BACKEND
 * ---------------------------------------------------
 * SETUP STEPS:
 *
 * 1. Create a new Google Sheet (or open an existing one).
 * 2. In the Sheet, go to: Extensions > Apps Script
 * 3. Delete any default code in the editor and paste in ALL of this file.
 * 4. Click the disk icon (Save project).
 * 5. Click "Deploy" > "New deployment".
 *    - Click the gear icon next to "Select type" > choose "Web app".
 *    - Description: "Merchant KYC Form Backend" (or anything).
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (required so the form can submit without login)
 *    - Click "Deploy".
 * 6. Authorize the script when prompted (click through the Google warning —
 *    this is expected for your own scripts; choose your account > Advanced >
 *    Go to project (unsafe) > Allow).
 * 7. Copy the "Web app URL" you're given after deployment.
 * 8. Open index.html, find this line near the bottom:
 *        const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
 *    Replace the placeholder text with the URL you copied.
 * 9. Save and redeploy on Vercel (or just push to GitHub — Vercel auto-redeploys).
 *
 * NOTE: Every time you make a code change here, you must create a
 * "New deployment" again (or manage deployments > edit > new version)
 * for the changes to take effect on the live URL.
 *
 * A Google Maps link is auto-generated from the GPS coordinates in the
 * last column, so you can tap it directly from the Sheet to view the
 * store location on a map.
 */

const SHEET_ID = "10cxQEFbd6I6vxN-kR6Q9golBcZex2XUocZToBdOApIo";

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1") || SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Define the column order — must match the 'name' attributes in index.html
  const headers = [
    "timestamp",
    "companyName", "trn", "storeName",
    "signatoryName", "signatoryEmail", "signatoryPhone",
    "financeName", "financeEmail", "financePhone",
    "storeManagerName", "storeManagerEmail", "storeManagerPhone",
    "shopNumber", "buildingName", "streetName", "areaName", "emirate",
    "latitude", "longitude", "mapLink"
  ];

  // If the sheet is empty, write the header row first
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  // Build a clickable Google Maps link from the captured coordinates
  data.mapLink = (data.latitude && data.longitude)
    ? "https://www.google.com/maps?q=" + data.latitude + "," + data.longitude
    : "";

  const row = headers.map(h => data[h] || "");
  sheet.appendRow(row);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: lets you test the deployment is live by visiting the Web App
 * URL directly in a browser (GET request).
 */
function doGet(e) {
  return ContentService.createTextOutput(
    "Merchant KYC form backend is running."
  );
}
