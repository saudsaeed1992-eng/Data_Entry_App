/**
 * EMPLOYEE DATA ENTRY FORM — GOOGLE SHEETS BACKEND
 * ---------------------------------------------------
 * SETUP STEPS:
 *
 * 1. Create a new Google Sheet (or open an existing one).
 * 2. In the Sheet, go to: Extensions > Apps Script
 * 3. Delete any default code in the editor and paste in ALL of this file.
 * 4. Click the disk icon (Save project).
 * 5. Click "Deploy" > "New deployment".
 *    - Click the gear icon next to "Select type" > choose "Web app".
 *    - Description: "Employee Form Backend" (or anything).
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (required so the form can submit without login)
 *    - Click "Deploy".
 * 6. Authorize the script when prompted (click through the Google warning —
 *    this is expected for your own scripts; choose your account > Advanced >
 *    Go to project (unsafe) > Allow).
 * 7. Copy the "Web app URL" you're given after deployment.
 * 8. Open employee-data-entry-form.html, find this line near the bottom:
 *        const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
 *    Replace the placeholder text with the URL you copied.
 * 9. Save the HTML file and open it in a browser (or upload it somewhere
 *    you can open it from, like Google Drive > open with browser, or host
 *    it on your desktop). Submitting the form will now add a row to this Sheet.
 *
 * NOTE: Every time you make a code change here, you must create a
 * "New deployment" again (or manage deployments > edit > new version)
 * for the changes to take effect on the live URL.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // Define the column order — must match the 'name' attributes in the HTML form
  const headers = [
    "timestamp", "employeeId", "dateOfJoining", "lastName", "firstName",
    "middleName", "gender", "dob", "nationality", "civilStatus",
    "mobile", "email", "address", "emergencyName", "emergencyNumber",
    "department", "jobTitle", "manager", "employmentType",
    "nationalId", "passport", "visaStatus", "labourCard"
  ];

  // If the sheet is empty, write the header row first
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

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
    "Employee form backend is running."
  );
}
