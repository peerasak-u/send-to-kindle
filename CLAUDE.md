# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**send-to-kindle** is a CLI tool for sending files to your Kindle via email using Apple Mail.app on macOS. The bridge between TypeScript and JXA (JavaScript for Automation) enables programmatic email sending with attachments.

### Key Concepts

- **JXA Integration**: The core functionality uses JXA (JavaScript for Automation) to communicate with Mail.app. The JXA script at `scripts/send-email.js` is executed from TypeScript via `Bun.$`.
- **macOS Only**: This tool only works on macOS since it relies on JXA and Mail.app.

## Development Commands

```bash
# Install dependencies
bun install

# Run the CLI
bun run index.ts

# Run tests
bun test
```

## Architecture

### Executing AppleScript from TypeScript

Use `Bun.$` to execute `osascript` commands:

```ts
// Execute inline AppleScript
const result = await Bun.$`osascript -e 'tell application "Mail" to get name of inbox'`

// Execute .scpt file
const result = await Bun.$`osascript scripts/mail.scpt`
```

### AppleScript Mail Operations

Common Mail.app AppleScript patterns:

```applescript
-- Get messages in inbox
tell application "Mail"
    get messages in inbox
end tell

-- Get message properties
tell application "Mail"
    get subject of message 1 of inbox
    get sender of message 1 of inbox
    get content of message 1 of inbox
end tell

-- Send email
tell application "Mail"
    make new outgoing message with properties {subject:"Test", body:"Body text"}
end tell
```

---

## Bun Configuration

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv
- Use `Bun.$` for shell commands (replaces execa)
