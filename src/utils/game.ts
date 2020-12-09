import { v4 as uuid } from 'uuid';
import {
    Lifeline,
    LifelineType,
    AlienQuestion,
    Question,
    UserAnswer,
    Category,
} from '@/types/types';
import { sortBy } from 'lodash';

export const createFiftyFiftyLifeline = (): Lifeline => ({
    id: uuid(),
    type: LifelineType.FiftyFifty,
    isUsed: false,
    name: '50/50',
});

export const createPlusTenLifeline = (): Lifeline => ({
    id: uuid(),
    type: LifelineType.PlusTen,
    isUsed: false,
    name: '+10s',
});

export const isFiftyFiftyLifeline = ({ type }: Lifeline) => type === LifelineType.FiftyFifty;
export const isPlusTenLifeline = ({ type }: Lifeline) => type === LifelineType.PlusTen;

export const getRoundedTime = (time: number) => Math.round(time * 10) / 10;

const isCorrectAnswer = ({ isCorrect }: UserAnswer) => isCorrect === true;
const isIncorrectAnswer = ({ isCorrect }: UserAnswer) => isCorrect === false;
const pickTime = ({ time }: UserAnswer) => time;

export const getStatistics = (userAnswers: UserAnswer[], questions: Question[]) => {
    const allTimes = userAnswers.map(pickTime);
    const noOfCorrectAnswers = userAnswers.filter(isCorrectAnswer).length;
    const noOfIncorrectAnswers = userAnswers.filter(isIncorrectAnswer).length;
    const noOfUnansweredQuestions = questions.length - noOfCorrectAnswers - noOfIncorrectAnswers;
    const quickestAnswer = allTimes.length > 0 ? allTimes.sort((a, b) => b - a).pop() : -1;
    const slowestAnswer = allTimes.length > 0 ? allTimes.sort((a, b) => a - b).pop() : -1;
    const averageTimePerQuestion =
        allTimes.length > 0
            ? getRoundedTime(allTimes.reduce((sum, curr) => (sum += curr), 0) / allTimes.length)
            : -1;

    return {
        noOfCorrectAnswers,
        noOfIncorrectAnswers,
        noOfUnansweredQuestions,
        quickestAnswer,
        slowestAnswer,
        averageTimePerQuestion,
    };
};

export const isQuestionUnanswered = ({ userAnswer }: Question) => userAnswer === null;

export const getNextUnansweredQuestion = (questions: Question[]) =>
    questions.find(isQuestionUnanswered) || null;

export const getNoOfUnansweredQuestions = (questions: Question[]) =>
    questions.filter(isQuestionUnanswered).length;

export const unescape = (string: string) => {
    const parsedString = new DOMParser().parseFromString(string, 'text/html').querySelector('html');
    if (parsedString === null) {
        return string;
    }
    if (parsedString.textContent === null) {
        return string;
    }
    return parsedString.textContent;
};

export const normalizeQuestions = (alienQuestions: AlienQuestion[]): Question[] =>
    alienQuestions.map(
        (alienQuestion: AlienQuestion): Question => {
            const {
                category,
                difficulty,
                question,
                correct_answer: correctAnswer,
                incorrect_answers: incorrectAnswers,
            } = alienQuestion;

            return {
                id: uuid(),
                category: unescape(category),
                difficulty,
                question: unescape(question),
                correctAnswer: unescape(correctAnswer),
                incorrectAnswers: incorrectAnswers.map(unescape),
                userAnswer: null,
            };
        }
    );
export const normalizeCategories = (alienCategories: Category[]): Category[] => {
    const categories = alienCategories.map(
        (alienCategory: Category): Category => {
            const { id, name } = alienCategory;

            return {
                id,
                name: unescape(name),
            };
        }
    );
    const sortedCategories = sortBy(categories, 'name');
    sortedCategories.unshift({ id: -1, name: 'All' });
    return sortedCategories;
};
