#!/usr/bin/env osascript

function run(argv) {
  if (argv.length < 3) {
    throw new Error("Usage: send-email.js <recipient> <sender> <attachment-path> [subject-prefix]\nExample: send-email.js kindle@kindle.com me@gmail.com /path/to/file.pdf 'Daily News'");
  }

  const recipientEmail = argv[0];
  const senderEmail = argv[1];
  const attachmentPath = argv[2];
  const subjectPrefix = argv[3] || "Daily News";

  const mail = Application("Mail");
  mail.includeStandardAdditions = true;

  // Format today's date as DD-MM-YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const emailSubject = `${subjectPrefix} ${formattedDate}`;

  const newMessage = mail.OutgoingMessage({
    subject: emailSubject,
    content: "",
    visible: false,
    sender: senderEmail
  });

  const recipient = mail.Recipient({
    address: recipientEmail
  });

  const message = mail.outgoingMessages.push(newMessage);
  message.toRecipients.push(recipient);

  const attachmentFile = Path(attachmentPath);
  message.attachments.push(mail.Attachment({ file: attachmentFile }));

  mail.send(message);

  return `Email sent to ${recipientEmail}`;
}
