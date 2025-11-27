export interface Participant {
  id: string;
  name: string;
  phoneNumber?: string;
}

export interface Match {
  giver: Participant;
  receiver: Participant;
}