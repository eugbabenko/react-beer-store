import { ContainerType } from '../enums';
export declare class BeerDTO {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly brewedAt: string;
    readonly tagline: string;
    readonly firstBrewed: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly abv: number;
    readonly ibu: number;
    readonly targetFg: number;
    readonly targetOg: number;
    readonly ebc: number;
    readonly srm: number;
    readonly ph: number;
    readonly attenuationLevel: number;
    readonly volume: {
        value: number;
        unit: string;
    };
    readonly boilVolume: {
        [key: string]: any;
    };
    readonly method: {
        [key: string]: any;
    };
    readonly foodPairing: string[];
    readonly brewersTips: string;
    readonly contributedBy: string;
    readonly currency: string;
    readonly containerType: ContainerType;
    readonly amount: number;
    readonly createdAt: string;
}
