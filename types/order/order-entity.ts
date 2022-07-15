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
    arrived?: string | number | boolean;
    userId: string;
}

export interface OrderEntityForUser extends Omit<OrderEntity, 'userId'>{

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
