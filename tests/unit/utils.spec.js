/* eslint-disable @typescript-eslint/camelcase */
import {
    getStatistics,
    unescape,
    normalizeQuestions,
    normalizeCategories,
} from '../../src/utils/game';

describe('getStatistics', () => {
    test('correct/incorrect answers', async () => {
        const userAnswers = [
            { questionId: '1', time: 2, isCorrect: true },
            { questionId: '2', time: 4, isCorrect: false },
            { questionId: '3', time: 2, isCorrect: true },
            { questionId: '4', time: 6, isCorrect: true },
            { questionId: '5', time: 3, isCorrect: false },
        ];
        const { noOfIncorrectAnswers, noOfCorrectAnswers } = getStatistics(userAnswers, 5);
        expect(noOfCorrectAnswers).toBe(3);
        expect(noOfIncorrectAnswers).toBe(2);
    });
    test('unanswered questions', async () => {
        const userAnswers = [
            { questionId: '1', time: 2, isCorrect: true },
            { questionId: '2', time: 4, isCorrect: false },
            { questionId: '4', time: 6, isCorrect: true },
        ];
        const { noOfUnansweredQuestions } = getStatistics(userAnswers, 5);
        expect(noOfUnansweredQuestions).toBe(2);
    });
    test('average time per question', async () => {
        const userAnswers = [
            { questionId: '1', time: 2, isCorrect: true },
            { questionId: '2', time: 4, isCorrect: false },
            { questionId: '3', time: 2, isCorrect: true },
            { questionId: '4', time: 6, isCorrect: true },
            { questionId: '5', time: 3, isCorrect: false },
        ];
        const { averageTimePerQuestion } = getStatistics(userAnswers, 5);
        expect(averageTimePerQuestion).toBe(3);
    });
    test('quickest and slowest time per game', async () => {
        const userAnswers = [
            { questionId: '1', time: 2, isCorrect: true },
            { questionId: '2', time: 4, isCorrect: false },
            { questionId: '3', time: 0.1, isCorrect: true },
        ];
        const { quickestAnswer, slowestAnswer } = getStatistics(userAnswers, 3);
        expect(quickestAnswer).toBe(0.1);
        expect(slowestAnswer).toBe(4);
    });
});
describe('unescape', () => {
    test('unescape strings', async () => {
        const str = `What is the alter-ego of the DC comics character &quot;Superman&quot;?`;
        expect(unescape(str)).toBe(`What is the alter-ego of the DC comics character "Superman"?`);
    });
});
describe('normalizeQuestions', () => {
    test('normalize question from api', async () => {
        const alienQuestions = [
            {
                category: 'Entertainment: Film',
                type: 'multiple',
                difficulty: 'medium',
                question:
                    'Velma Kelly and Roxie Hart are the protagonists of which Oscar winning movie?',
                correct_answer: 'Chicago',
                incorrect_answers: ['Dreamgirls', 'Cabaret', 'All That Jazz'],
            },
        ];
        const normalizedQuestions = normalizeQuestions(alienQuestions);
        expect(normalizedQuestions[0]).toHaveProperty('id');
        delete normalizedQuestions[0].id;
        expect(normalizedQuestions[0]).toMatchObject({
            category: 'Entertainment: Film',
            correctAnswer: 'Chicago',
            difficulty: 'medium',
            incorrectAnswers: ['Dreamgirls', 'Cabaret', 'All That Jazz'],
            question:
                'Velma Kelly and Roxie Hart are the protagonists of which Oscar winning movie?',
        });
    });
});
describe('normalizeCategories', () => {
    test('normalize categories from api', async () => {
        const alienCategories = [
            {
                id: 9,
                name: 'General Knowledge',
            },
        ];
        expect(normalizeCategories(alienCategories)).toMatchObject([
            {
                id: -1,
                name: 'All',
            },
            {
                id: 9,
                name: 'General Knowledge',
            },
        ]);
    });
});
