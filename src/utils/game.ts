import { unescape } from 'lodash';
import { v4 as uuid } from 'uuid';
import { Lifeline, LifelineType, AlienQuestion, Question, UserAnswer } from '@/types/types';

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

const isCorrectAnswer = ({ isCorrect }: UserAnswer) => isCorrect === true;
const isIncorrectAnswer = ({ isCorrect }: UserAnswer) => isCorrect === false;
const isUnanswered = (userAnswer: UserAnswer) => userAnswer === null;
const pickTime = ({ time }: UserAnswer) => time;

export const getStatistics = (userAnswers: UserAnswer[]) => {
    const allTimes = userAnswers.map(pickTime);
    const noOfCorrectAnswers = userAnswers.filter(isCorrectAnswer).length;
    const noOfIncorrectAnswers = userAnswers.filter(isIncorrectAnswer).length;
    const noOfUnansweredQuestions = userAnswers.filter(isUnanswered).length;

    const averageTimePerQuestion = allTimes.reduce((sum, curr) => (sum += curr)) / allTimes.length;
    const quickestAnswer = allTimes.sort((a, b) => b - a).pop();
    const slowestAnswer = allTimes.sort((a, b) => a - b).pop();

    return {
        noOfCorrectAnswers,
        noOfIncorrectAnswers,
        noOfUnansweredQuestions,
        averageTimePerQuestion,
        quickestAnswer,
        slowestAnswer,
    };
};

export const isQuestionUnanswered = ({ userAnswer }: Question) => userAnswer === null;

export const getNextUnansweredQuestion = (questions: Question[]) =>
    questions.find(isQuestionUnanswered) || null;

export const getNoOfUnansweredQuestions = (questions: Question[]) =>
    questions.filter(isQuestionUnanswered).length;

export const getRoundedTime = (time: number) => Math.round(time * 10) / 10;

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
                category,
                difficulty,
                question: unescape(question),
                correctAnswer,
                incorrectAnswers,
                userAnswer: null,
            };
        }
    );
