import { MailerError } from "./errors.ts";
import type { EmailParams } from "./types.ts";

// Get the directory of the current module to resolve paths
const SCRIPT_DIR = import.meta.dir;
const JXA_SCRIPT = `${SCRIPT_DIR}/../scripts/send-email.js`;

export async function sendEmail(params: EmailParams): Promise<string> {
  const args = [
    params.to,
    params.from,
    params.file,
    params.subject,
  ];

  if (params.message) {
    args.push(params.message);
  }

  const proc = Bun.$([
    "osascript",
    "-l",
    "JavaScript",
    JXA_SCRIPT,
    ...args,
  ]);

  const result = await proc.quiet();

  if (result.exitCode !== 0) {
    const stderr = result.stderr.toString().trim();
    throw new MailerError(`Failed to send email: ${stderr}`);
  }

  return result.stdout.toString().trim();
}
