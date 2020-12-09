import { Category, Question, UseQuestions, UseQuestionsState } from '@/types/types';
import { normalizeCategories, normalizeQuestions } from '@/utils/game';
import { computed, reactive } from 'vue';

const OPENTDB_URL = 'https://opentdb.com/api.php';
const OPENTDB_CATEGORIES_URL = 'https://opentdb.com/api_category.php';

export default (): UseQuestions => {
    const state: UseQuestionsState = reactive({
        error: '',
        questions: [],
        categories: [],
    });

    // Mutations
    const setQuestions = (questions: Question[]) => (state.questions = questions);
    const setCategories = (categories: Category[]) => (state.categories = categories);
    const setError = (error: string) => (state.error = error);

    // Actions
    const fetchQuestions = async (categoryId: number) => {
        let fetchQuestionsURL = `${OPENTDB_URL}?amount=10&type=multiple`;
        try {
            if (categoryId !== -1) {
                // -1 is all categories, so we don't specify a category in our call.
                fetchQuestionsURL = fetchQuestionsURL.concat(`&category=${categoryId}`);
            }
            const response = await fetch(fetchQuestionsURL);
            const { results: questions } = await response.json();
            setQuestions(normalizeQuestions(questions));
        } catch (e) {
            setError(e);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${OPENTDB_CATEGORIES_URL}`);
            const { trivia_categories: categories } = await response.json();
            setCategories(normalizeCategories(categories));
        } catch (e) {
            setError(e);
        }
    };
    return {
        questions: computed(() => state.questions),
        categories: computed(() => state.categories),
        error: computed(() => state.error),
        fetchQuestions,
        fetchCategories,
    };
};
