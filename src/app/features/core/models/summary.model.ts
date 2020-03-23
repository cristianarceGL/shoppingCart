export interface ShippingSummary {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface BillingSummary {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface PaymentSummary {
  cardName: string;
  cardNumber: string;
  cardType: string;
}
