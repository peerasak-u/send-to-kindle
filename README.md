# send-to-kindle

A CLI tool for sending files to your Kindle via email using Apple Mail.app on macOS.

## Install

```bash
# via bunx
bunx @peerasak-u/send-to-kindle --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf

# or install globally
bun install -g @peerasak-u/send-to-kindle
send-to-kindle --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf
```

## Usage

```bash
# Show help
bunx @peerasak-u/send-to-kindle --help

# Send a file to Kindle
bunx @peerasak-u/send-to-kindle --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf

# Send with custom subject
bunx @peerasak-u/send-to-kindle --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf --subject="Monthly Report"

# Send with message body
bunx @peerasak-u/send-to-kindle --to=your-kindle@kindle.com --from=your-email@gmail.com --file=/path/to/document.pdf --message="Enjoy reading!"
```

## Options

| Option | Required | Description |
|--------|----------|-------------|
| `--to` | Yes | Recipient email address (e.g., your Kindle email) |
| `--from` | Yes | Sender email address (must be approved in your Amazon account) |
| `--file` | Yes | Path to the file to attach |
| `--subject` | No | Subject prefix (default: "Daily News") |
| `--message` | No | Body message for the email |
| `--help` | No | Show help message |
| `--version` | No | Show version number |

## Development

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
