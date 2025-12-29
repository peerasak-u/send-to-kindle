# send-to-kindle

A CLI tool for sending files to your Kindle via email using Apple Mail.app on macOS.

## Install Dependencies

```bash
bun install
```

## Usage

```bash
# Show help
bun run index.ts --help

# Send a file to Kindle
bun run index.ts --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf

# Send with custom subject
bun run index.ts --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf --subject="Monthly Report"
```

## Options

| Option | Required | Description |
|--------|----------|-------------|
| `--to` | Yes | Recipient email address (e.g., your Kindle email) |
| `--from` | Yes | Sender email address (must be approved in your Amazon account) |
| `--file` | Yes | Path to the file to attach |
| `--subject` | No | Subject prefix (default: "Daily News") |
| `--help` | No | Show help message |
| `--version` | No | Show version number |

## Development

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
