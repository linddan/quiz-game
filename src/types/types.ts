export enum QuestionDifficulty {
    Easy = 'EASY',
    Medium = 'MEDIUM',
    Hard = 'HARD',
}

export interface UserAnswer {
    time: number;
    answer: string;
}

export interface Question {
    id: string;
    category: string;
    difficulty: QuestionDifficulty;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    UserAnswer: UserAnswer;
}

export enum LifelineType {
    FiftyFifty = 'FIFTY_FIFTY',
    PlusTen = 'PLUS_TEN',
}

export interface Lifeline {
    type: LifelineType;
    isUsed: boolean;
}

export enum GameState {
    Finished = 'FINISHED',
    NotStarted = 'NOT_STARTED',
    Playing = 'PLAYING',
}

export interface Game {
    gameState: GameState;
    questions: Question[];
    lifelines: Lifeline[];
}
