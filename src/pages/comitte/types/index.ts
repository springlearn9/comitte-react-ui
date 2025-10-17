export type Comitte = {
  comitteId: number;
  ownerId: number;
  comitteName: string;
  startDate?: string | null;
  fullAmount?: number | null;
  membersCount?: number | null;
  fullShare?: number | null;
  dueDateDays?: number | null;
  paymentDateDays?: number | null;
  createdTimestamp?: string | null;
  updatedTimestamp?: string | null;
};

export type ComitteMemberMap = {
  id?: number;
  comitteId: number;
  memberId: number;
  shareCount?: number;
};