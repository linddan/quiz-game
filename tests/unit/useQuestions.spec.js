import useQuestions from '../../src/composables/useQuestions';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('useQuestions', () => {
    test('something', async () => {
        const { fetchQuestions, questions, error } = useQuestions();
        await fetchQuestions();
        console.log(questions.value);
        console.log(error.value);
    });
});
