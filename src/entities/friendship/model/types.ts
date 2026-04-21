export type FriendshipStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";

export interface Friendship {
  id: number;
  senderId: number;
  senderNickname: string;
  receiverId: number;
  receiverNickname: string;
  status: FriendshipStatus;
}
