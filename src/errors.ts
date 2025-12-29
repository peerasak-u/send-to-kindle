export class CliError extends Error {
  constructor(message: string, public readonly exitCode: number = 1) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends CliError {
  constructor(message: string) {
    super(message, 1);
  }
}

export class FileAccessError extends CliError {
  constructor(message: string) {
    super(message, 1);
  }
}

export class MailerError extends CliError {
  constructor(message: string) {
    super(message, 2);
  }
}

export class UsageError extends CliError {
  constructor(message: string) {
    super(message, 1);
  }
}
