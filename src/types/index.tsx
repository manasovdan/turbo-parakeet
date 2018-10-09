export enum Difficulty {
    Easy,
    Medium,
    Hard,
}

export enum cardsPerDifficulty {
    Easy = 16,
    Medium = 36,
    Hard = 64
}


export interface ICard {
    value: number,
    image: string,
    matched: boolean,
    isOpen: boolean
}