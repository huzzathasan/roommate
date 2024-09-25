export interface UserRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string;
  updated: string;
  firstName: string;
  lastName: string;
  avatar: string;
  facebook: string;
  youtube: string;
  github: string;
  city: string;
  country: string;
  state: string;
  postalCode: number;
  address: string;
  posts: string[];
  friends: string[];
}

export interface MessageRecord {
  id?: string;
  collectionId?: string;
  collectionName?: string;
  created?: string;
  updated?: string;
  message?: string;
  sender: string;
  receiver: string;
  media?: string[];
  replay?: string;
}
