#!/usr/bin/env osascript

function run(argv) {
  if (argv.length < 3) {
    throw new Error("Usage: send-email.js <recipient> <sender> <attachment-path> [subject-prefix] [message-body]");
  }

  const recipientEmail = argv[0];
  const senderEmail = argv[1];
  const attachmentPath = argv[2];
  const subjectPrefix = argv[3] || "Daily News";
  const messageBody = argv[4] || "";

  const app = Application.currentApplication();
  app.includeStandardAdditions = true;

  // Format today's date as DD-MM-YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = day + "-" + month + "-" + year;

  const emailSubject = subjectPrefix + " " + formattedDate;

  // Use AppleScript string for Mail.app interaction
  const script = `
    tell application "Mail"
      set newMessage to make new outgoing message with properties {subject:"${emailSubject}", content:"${messageBody}", visible:false}
      tell newMessage
        make new to recipient at end of to recipients with properties {address:"${recipientEmail}"}
        try
          make new attachment at end of attachments with properties {file:POSIX file "${attachmentPath}"}
        end try
        send
      end tell
    end tell
    return "Email sent to ${recipientEmail}"
  `;

  return app.runScript(script);
}
