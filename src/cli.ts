import { parseArgs } from "node:util";
import { UsageError } from "./errors.ts";
import type { CliArgs } from "./types.ts";

const VERSION = "1.0.0";

export function showHelp(): never {
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

export function showVersion(): never {
  console.log(`Apple Mail CLI v${VERSION}`);
  throw new UsageError("Version requested");
}

export function parseCliArgs(args: string[]): CliArgs {
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
      version: { type: "boolean", short: "v" },
    },
  });

  if (values.help) {
    showHelp();
  }

  if (values.version) {
    showVersion();
  }

  const required = ["to", "from", "file"] as const;
  for (const key of required) {
    if (!values[key]) {
      throw new UsageError(`Missing required option: --${key}\nRun --help for usage information.`);
    }
  }

  return {
    to: values.to!,
    from: values.from!,
    file: values.file!,
    subject: values.subject,
    message: values.message,
  };
}
