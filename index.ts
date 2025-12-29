#!/usr/bin/env bun

import { parseCliArgs } from "./src/cli.ts";
import { validateEmailParams } from "./src/validator.ts";
import { sendEmail } from "./src/mailer.ts";
import { CliError } from "./src/errors.ts";
import type { EmailParams } from "./src/types.ts";

async function main() {
  try {
    // Parse CLI arguments
    const cliArgs = parseCliArgs(process.argv.slice(2));

    // Convert to EmailParams with default subject
    const params: EmailParams = {
      to: cliArgs.to,
      from: cliArgs.from,
      file: cliArgs.file,
      subject: cliArgs.subject ?? "Daily News",
    };

    // Validate inputs
    await validateEmailParams(params);

    // Send email
    const result = await sendEmail(params);
    console.log(result);

    process.exit(0);
  } catch (error) {
    if (error instanceof CliError) {
      console.error(`Error: ${error.message}`);
      process.exit(error.exitCode);
    }
    // Handle unexpected errors
    console.error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main();
