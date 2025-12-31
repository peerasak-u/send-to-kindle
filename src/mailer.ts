import { MailerError } from "./errors.ts";
import type { EmailParams } from "./types.ts";

// Get the directory of the current module to resolve paths
const SCRIPT_DIR = import.meta.dir;
const APPLESCRIPT_FILE = `${SCRIPT_DIR}/../scripts/send-email.scpt`;

export async function sendEmail(params: EmailParams): Promise<string> {
  const messageArg = params.message ? `"${params.message}"` : "";

  const proc = Bun.$`osascript ${APPLESCRIPT_FILE} ${params.to} ${params.from} ${params.file} ${params.subject} ${messageArg}`;

  const result = await proc.quiet();

  if (result.exitCode !== 0) {
    const stderr = result.stderr.toString().trim();
    throw new MailerError(`Failed to send email: ${stderr}`);
  }

  return result.stdout.toString().trim();
}
