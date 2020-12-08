import { ComputedRef } from 'vue';

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
    userAnswer: UserAnswer | null;
}

export interface AlienQuestion {
    category: string;
    type: string;
    difficulty: QuestionDifficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
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

export interface UseGameState {
    gameState: GameState;
    questions: Question[];
    lifelines: Lifeline[];
}

export interface UseGame {
    questions: ComputedRef<Question[]>;
    nextQuestion: ComputedRef<Question | null>;
    isNotGameStarted: ComputedRef<boolean>;
    isGameFinished: ComputedRef<boolean>;
    startGame: () => void;
    endGame: () => void;
    resetGame: () => void;
    addQuestions: (questions: Question[]) => void;
    addAnswer: (questionId: string, answer: UserAnswer) => void;
}

export interface UseQuestionsState {
    questions: Question[];
    error: string;
}

export interface UseQuestions {
    questions: ComputedRef<Question[]>;
    error: ComputedRef<string>;
    fetchQuestions: () => void;
}
