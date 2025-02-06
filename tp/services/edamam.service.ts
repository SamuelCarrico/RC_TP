import HttpUtils from "../utils/http";
import {FoodResponseDto} from "../types/FoodResponseDto";
import {FoodRequestDto} from "../types/FoodRequestDto";

class EdamamService extends HttpUtils {
    private static getBaseUrl(): string {
        return process.env.EXPO_PUBLIC_EDAMAM_URL ?? "";
    }

    private static getAppId(): string {
        return process.env.EXPO_PUBLIC_EDAMAM_APPID ?? "";
    }

    private static getAppKey(): string {
        return process.env.EXPO_PUBLIC_EDAMAM_APPKEY ?? "";
    }

    private static getHeaders(): Record<string, string> {
        return {
            "Content-Type": "application/json",
            "app_id": this.getAppId(),
            "app_key": this.getAppKey(),
        };
    }

    public static async getRecipes(query: Pick<FoodRequestDto, 'q'>): Promise<string[]> {
        try {
            const url = `${this.getBaseUrl()}/auto-complete?q=${query.q}`;
            const response = await this.get(url, this.getHeaders());
            return response ?? [];
        } catch (error) {
            console.error("Erreur récupérations recettes d'Edamam:", error);
            return [];
        }
    }

    public static async getMealByBarcode(barcode: Pick<FoodRequestDto, 'upc'>): Promise<FoodResponseDto | null> {
        try {
            const url = `${this.getBaseUrl()}/api/food-database/v2/parser?app_id=${this.getAppId()}&app_key=${this.getAppKey()}&upc=${barcode}`;
            return await this.get(url, this.getHeaders());
        } catch (error) {
            console.error("Erreur récupérations plats d'Edamam::", error);
            return null;
        }
    }

    public static async getFoodByName(ingr: Pick<FoodRequestDto, 'ingr'>): Promise<FoodResponseDto | null> {
        try {
            const url = `${this.getBaseUrl()}/api/food-database/v2/parser?app_id=${this.getAppId()}&app_key=${this.getAppKey()}&ingr=${ingr.ingr}`;
            return await this.get(url);
        } catch (error) {
            console.error("Erreur récupérations plats d'Edamam: ", error);
            return null;
        }
    }

}

export default EdamamService;
