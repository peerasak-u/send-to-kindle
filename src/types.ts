export interface CliArgs {
  to: string;
  from: string;
  file: string;
  subject?: string;
  message?: string;
}

export interface EmailParams {
  to: string;
  from: string;
  file: string;
  subject: string;
  message?: string;
}
