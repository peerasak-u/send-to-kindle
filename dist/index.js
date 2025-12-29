#!/usr/bin/env bun
// @bun

// src/cli.ts
import { parseArgs } from "util";

// src/errors.ts
class CliError extends Error {
  exitCode;
  constructor(message, exitCode = 1) {
    super(message);
    this.exitCode = exitCode;
    this.name = this.constructor.name;
  }
}

class ValidationError extends CliError {
  constructor(message) {
    super(message, 1);
  }
}

class FileAccessError extends CliError {
  constructor(message) {
    super(message, 1);
  }
}

class MailerError extends CliError {
  constructor(message) {
    super(message, 2);
  }
}

class UsageError extends CliError {
  constructor(message) {
    super(message, 1);
  }
}

// src/cli.ts
var VERSION = "1.0.0";
function showHelp() {
  console.log(`
Apple Mail CLI - Send emails with attachments via Mail.app

USAGE:
  bun run index.ts [OPTIONS]

REQUIRED OPTIONS:
  --to <email>       Recipient email address
  --from <email>     Sender email address
  --file <path>      Path to attachment file

OPTIONAL:
  --subject <text>   Subject prefix (default: "Daily News")
  --message <text>   Body message for the email
  --help             Show this help message
  --version          Show version number

EXAMPLES:
  # Basic usage
  bun run index.ts --to=kindle@kindle.com --from=me@gmail.com --file=/path/to/doc.pdf

  # With custom subject
  bun run index.ts --to=x@y.com --from=me@gmail.com --file=report.pdf --subject="Monthly Report"
`);
  throw new UsageError("Help requested");
}
function showVersion() {
  console.log(`Apple Mail CLI v${VERSION}`);
  throw new UsageError("Version requested");
}
function parseCliArgs(args) {
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      to: { type: "string" },
      from: { type: "string" },
      file: { type: "string" },
      subject: { type: "string" },
      message: { type: "string" },
      help: { type: "boolean", short: "h" },
      version: { type: "boolean", short: "v" }
    }
  });
  if (values.help) {
    showHelp();
  }
  if (values.version) {
    showVersion();
  }
  const required = ["to", "from", "file"];
  for (const key of required) {
    if (!values[key]) {
      throw new UsageError(`Missing required option: --${key}
Run --help for usage information.`);
    }
  }
  return {
    to: values.to,
    from: values.from,
    file: values.file,
    subject: values.subject,
    message: values.message
  };
}

// src/validator.ts
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(email, field) {
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError(`Invalid ${field} email address: ${email}`);
  }
}
async function validateFile(filePath) {
  const file = Bun.file(filePath);
  const exists = await file.exists();
  if (!exists) {
    throw new FileAccessError(`File not found: ${filePath}`);
  }
  const size = file.size;
  if (size === 0) {
    throw new FileAccessError(`File is empty: ${filePath}`);
  }
}
async function validateEmailParams(params) {
  validateEmail(params.to, "recipient (to)");
  validateEmail(params.from, "sender (from)");
  await validateFile(params.file);
}

// src/mailer.ts
var SCRIPT_DIR = import.meta.dir;
var JXA_SCRIPT = `${SCRIPT_DIR}/../scripts/send-email.js`;
async function sendEmail(params) {
  const messageArg = params.message ? `"${params.message}"` : "";
  const proc = Bun.$`osascript -l JavaScript ${JXA_SCRIPT} ${params.to} ${params.from} ${params.file} ${params.subject} ${messageArg}`;
  const result = await proc.quiet();
  if (result.exitCode !== 0) {
    const stderr = result.stderr.toString().trim();
    throw new MailerError(`Failed to send email: ${stderr}`);
  }
  return result.stdout.toString().trim();
}

// index.ts
async function main() {
  try {
    const cliArgs = parseCliArgs(process.argv.slice(2));
    const params = {
      to: cliArgs.to,
      from: cliArgs.from,
      file: cliArgs.file,
      subject: cliArgs.subject ?? "Daily News",
      message: cliArgs.message
    };
    await validateEmailParams(params);
    const result = await sendEmail(params);
    console.log(result);
    process.exit(0);
  } catch (error) {
    if (error instanceof CliError) {
      console.error(`Error: ${error.message}`);
      process.exit(error.exitCode);
    }
    console.error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
main();
