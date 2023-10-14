export interface IOltranzRequestToPay {
  telephoneNumber: string;
  amount: number;
  organizationId: string;
  description: string;
  callbackUrl: string;
  transactionId: string;
}
