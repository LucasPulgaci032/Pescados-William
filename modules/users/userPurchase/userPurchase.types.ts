export interface PurchaseItemDTO {
    fishId: string;
    quantity: number;
}

export interface CreatePurchaseDTO {
    userId: string;
    purchases: PurchaseItemDTO[];
}