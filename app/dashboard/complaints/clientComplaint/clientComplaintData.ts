export type ClientComplaint = {
  _id?: string;
  ReceivedFrom: string;
  PendingAtTheEndOfLastMonth: string;
  Received: string;
  Resolved: string;
  TotalPending: string;
  PendingMoreThanThreeMonths: string;
  AverageResolutionTime: string;
  createdAt?: string;
  updatedAt?: string;
};
