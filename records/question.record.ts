import {QuestionEntity, QuestionEntityForUser} from "../types";
import {ValidationError} from "../utils/errrors";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";

type typeExecuteHandler = [QuestionRecord[], FieldPacket[]];

class QuestionRecord implements QuestionEntity {
    public id: string;
    public pointName: string;
    public part: string;
    public model: string;
    public quality: string;
    public color: string;
    public information: string;
    public userId: string;

    constructor(obj: QuestionEntity) {
        if (obj.pointName.length > 30 || obj.pointName.length < 5) {
            throw new ValidationError('Nazwa punktu o takiej długości nie istnieje.')
        }

        if (obj.model.length > 45 || obj.model.length < 4) {
            throw new ValidationError('Urządzenie o takiej długości nie istnieje. Jeśli tak skontaktuj się z nami ( :')
        }

        if (obj.part.length > 70 || obj.part.length < 3) {
            throw new ValidationError('Sprecyzuj zwięźle o jaką część chodzi, jeśli masz dodatkowe zapytania prosze uzupełnić dodatkowe informacje.')
        }

        if (obj.quality.length > 13 || obj.quality.length < 6) {
            throw new ValidationError('Wybierz z rozsuwanej listy jakiej jakości produkt chcesz zamówić.')
        }

        if (obj.userId.length !== 36) {
            throw new ValidationError('Wystąpił nieoczekiwany problem z Twoim kontem, spróbuj zalogować się ponownie.')
        }

        if (!obj.pointName) {
            throw new ValidationError('Nazwa punktu nie może być pusta.');
        }

        if (!obj.model) {
            throw new ValidationError('Nazwa modelu nie może być pusta.');
        }

        if (!obj.part) {
            throw new ValidationError('Nazwa części nie może być pusta.');
        }

        if (!obj.quality) {
            throw new ValidationError('Pole z jakością części nie może być pusta.');
        }


        this.id = obj.id;
        this.pointName = obj.pointName;
        this.part = obj.part;
        this.model = obj.model;
        this.quality = obj.quality;
        this.color = obj.color;
        this.information = obj.information;
        this.userId = obj.userId;

    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that already exist!');
        }

        await pool.execute("INSERT INTO `question`(`id`, `pointName`, `model`, `part`, `color`, `quality`, `information`, `userId`) VALUES(:id, :pointName, :model, :part, :color, :quality, :information, :userId)", {
            id: this.id,
            pointName: this.pointName,
            part: this.part,
            model: this.model,
            quality: this.quality,
            color: this.color,
            information: this.information,
            userId: this.userId

        });

        return this.id;
    }

    static async getAllUserOrder(userId: string): Promise<QuestionEntityForUser[] | null> {

        const [results] = (await pool.execute("SELECT * FROM `question` WHERE `userId` = :userId", {
            userId,
        })) as typeExecuteHandler;

        return results.length === 0 ? null : results.map(result => {
            const {
                id,
                pointName,
                model,
                part,
                color,
                quality,
                information,
            } = result;
            return {
                id,
                pointName,
                model,
                part,
                color,
                quality,
                information,
            };
        });
    }

}

export {
    QuestionRecord,
}
