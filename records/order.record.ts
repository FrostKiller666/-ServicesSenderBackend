import {OrderEntity, OrderEntityForUser} from "../types/order";
import {ValidationError} from "../utils/errrors";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";

type typeExecuteHandler = [OrderRecord[], FieldPacket[]];

class OrderRecord implements OrderEntity {
    public id: string;
    public pointName: string;
    public part: string;
    public model: string;
    public quality: string;
    public color: string;
    public price: number;
    public information: string;
    public guarantee: string;
    public userId: string;

    constructor(obj: OrderEntity) {
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

        if (obj.price > 9999 || obj.price < 0) {
            throw new ValidationError('Cena nie może być ujemna oraz przekraczac 9 999zł.')
        }

        if (obj.guarantee.length !== 3) {
            throw new ValidationError('Powstał nieoczekiwany problem z checkbox, spróbuj za kilka chwil, przepraszamy.')
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

        if (!obj.price) {
            throw new ValidationError('Cena nie może być pusta.');
        }

        if (!obj.guarantee) {
            throw new ValidationError('Powstał krytyczny problem z checkbox, spróbuj za kilka chwil, przepraszamy.');
        }

        this.id = obj.id;
        this.pointName = obj.pointName;
        this.part = obj.part;
        this.model = obj.model;
        this.quality = obj.quality;
        this.color = obj.color;
        this.price = obj.price;
        this.information = obj.information;
        this.guarantee = obj.guarantee;
        this.userId = obj.userId;

    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that already exist!');
        }

        await pool.execute("INSERT INTO `orders`(`id`, `pointName`, `model`, `part`, `color`, `quality`, `price`, `information`, `guarantee`, `userId`) VALUES(:id, :pointName, :model, :part, :color, :quality, :price, :information, :guarantee, :userId)", {
            id: this.id,
            pointName: this.pointName,
            part: this.part,
            model: this.model,
            quality: this.quality,
            color: this.color,
            price: this.price,
            information: this.information,
            guarantee: this.guarantee,
            userId: this.userId

        });

        return this.id;
    }

    static async getAllUserOrder(userId: string): Promise<OrderEntityForUser[] | null> {

        const [results] = (await pool.execute("SELECT * FROM `orders` WHERE `userId` = :userId", {
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
                price,
                information,
                guarantee
            } = result;
            return {
                id,
                pointName,
                model,
                part,
                color,
                quality,
                price,
                information,
                guarantee
            };
        });
    }

}

export {
    OrderRecord,
}
