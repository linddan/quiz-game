import { AlienQuestion, Question, UseQuestions, UseQuestionsState } from '@/types/types';
import { normalizeQuestions } from '@/utils/game';
import { computed, reactive } from 'vue';

const OPENTDB_URL = 'https://opentdb.com/api.php';

export default (): UseQuestions => {
    const state: UseQuestionsState = reactive({
        error: '',
        questions: [],
    });

    // Mutations
    const setQuestions = (questions: Question[]) => {
        state.questions = questions;
    };
    const setError = (error: string) => {
        state.error = error;
    };

    // Actions
    const fetchQuestions = async () => {
        try {
            const response = await fetch(`${OPENTDB_URL}?amount=10`);
            const { results: questions } = await response.json();
            setQuestions(normalizeQuestions(questions));
        } catch (e) {
            setError(e);
        }
    };
    return {
        questions: computed(() => state.questions),
        error: computed(() => state.error),
        fetchQuestions,
    };
};
