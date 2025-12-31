on run argv
  set recipientEmail to item 1 of argv
  set senderEmail to item 2 of argv
  set attachmentPath to item 3 of argv
  set subjectPrefix to ""
  set messageBody to ""

  if (count of argv) > 3 then
    set subjectPrefix to item 4 of argv
  end if
  if (count of argv) > 4 then
    set messageBody to item 5 of argv
  end if

  if subjectPrefix is "" then
    set subjectPrefix to "Daily News"
  end if

  -- Format today's date as DD-MM-YYYY
  set currentDate to current date
  set dayNum to day of currentDate
  set monthNum to month of currentDate as number
  set yearNum to year of currentDate

  -- Pad day and month with leading zeros
  if dayNum < 10 then
    set dayStr to "0" & (dayNum as string)
  else
    set dayStr to (dayNum as string)
  end if

  if monthNum < 10 then
    set monthStr to "0" & (monthNum as string)
  else
    set monthStr to (monthNum as string)
  end if

  set formattedDate to dayStr & "-" & monthStr & "-" & (yearNum as string)
  set emailSubject to subjectPrefix & " " & formattedDate

  -- Create and send email with attachment
  tell application "Mail"
    activate
    set newMessage to make new outgoing message with properties {subject:emailSubject, content:messageBody, visible:true}

    tell newMessage
      make new to recipient at end of to recipients with properties {address:recipientEmail}

      -- Add attachment - wait a moment for message to be ready
      delay 0.5

      try
        set attachmentFile to POSIX file attachmentPath
        tell content of newMessage
          make new attachment with properties {file name:attachmentFile} at after the last paragraph
        end tell
      on error errMsg number errNum
        log "Attachment error " & errNum & ": " & errMsg
      end try

      -- Wait for attachment to be added before sending
      delay 1

      send
    end tell
  end tell

  return "Email sent to " & recipientEmail
end run
