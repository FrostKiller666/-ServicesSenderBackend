export interface QuestionEntity {
    id: string;
    pointName: string;
    model: string;
    part: string;
    color?: string;
    quality: string;
    information?: string;
    arrived?: number;
    userId: string;
}

export interface QuestionEntityForUser extends Omit<QuestionEntity, 'userId'>{

}

export interface QuestionDataReq {
    pointName: string;
    model: string;
    part: string;
    color?: string;
    quality: string;
    information?: string;
}
