export interface OrderEntity {
    id: string;
    pointName: string;
    model: string;
    part: string;
    color?: string;
    quality: string;
    price: number;
    information?: string;
    guarantee: string;
    userId: string;
}

export interface OrderDataReq {
    pointName: string;
    model: string;
    part: string;
    color?: string;
    quality: string;
    price: string;
    information?: string;
    guarantee: string;
}
