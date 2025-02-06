export interface FoodResponseDto {
    text: string
    count: number
    parsed: Parsed[]
    hints: Hint[]
    _links: Links
}

export interface Parsed {
    food: Food
}

export interface Food {
    foodId: string
    label: string
    knownAs: string
    nutrients: Nutrients
    category: string
    categoryLabel: string
    image: string
}

export interface Nutrients {
    ENERC_KCAL: number
    PROCNT: number
    FAT: number
    CHOCDF: number
    FIBTG: number
}

export interface Hint {
    food: Food2
    measures: Measure[]
}

export interface Food2 {
    foodId: string
    label: string
    knownAs: string
    nutrients: Nutrients2
    category: string
    categoryLabel: string
    image: string
}

export interface Nutrients2 {
    ENERC_KCAL: number
    PROCNT: number
    FAT: number
    CHOCDF: number
    FIBTG: number
}

export interface Measure {
    uri: string
    label: string
    weight: number
}

export interface Links {
    next: Next
}

export interface Next {
    href: string
    title: string
}
