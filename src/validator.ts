import { ValidationError, FileAccessError } from "./errors.ts";
import type { EmailParams } from "./types.ts";

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string, field: string): void {
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError(`Invalid ${field} email address: ${email}`);
  }
}

export async function validateFile(filePath: string): Promise<void> {
  const file = Bun.file(filePath);

  // Check if file exists
  const exists = await file.exists();
  if (!exists) {
    throw new FileAccessError(`File not found: ${filePath}`);
  }

  // Check if file is readable
  const size = file.size;
  if (size === 0) {
    throw new FileAccessError(`File is empty: ${filePath}`);
  }
}

export async function validateEmailParams(params: EmailParams): Promise<void> {
  validateEmail(params.to, "recipient (to)");
  validateEmail(params.from, "sender (from)");
  await validateFile(params.file);
}
