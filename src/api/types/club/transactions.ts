export interface TransactionData {
  remainingFee: number;
  clubTransactionHistoryListDTOS: ClubTransactionHistoryListDTO[];
}

interface ClubTransactionHistoryListDTO {
  date: string;
  transactionType: string;
  department: string;
  detail: string;
}