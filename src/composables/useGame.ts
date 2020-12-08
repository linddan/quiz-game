import { reactive, computed } from 'vue';
import { UseGameState, GameState, Question, UserAnswer, UseGame, Lifeline } from '@/types/types';
import { getNextUnansweredQuestion } from '@/utils/game';

const state: UseGameState = reactive({
    gameState: GameState.NotStarted,
    questions: [],
    userAnswers: [],
    lifelines: [],
});

export default (): UseGame => {
    // Mutations
    const setGameState = (gameState: GameState) => (state.gameState = gameState);
    const setQuestions = (questions: Question[]) => (state.questions = questions);
    const setUserAnswers = (userAnswers: UserAnswer[]) => (state.userAnswers = userAnswers);
    const setLifelines = (lifelines: Lifeline[]) => (state.lifelines = lifelines);

    // Actions
    const startGame = () => setGameState(GameState.Playing);
    const endGame = () => setGameState(GameState.Finished);
    const resetGame = () => {
        setGameState(GameState.NotStarted);
        setQuestions([]);
        setUserAnswers([]);
        setLifelines([]);
    };
    const addQuestions = (questions: Question[]) =>
        setQuestions([...questions, ...state.questions]);
    const addUserAnswer = (answer: UserAnswer) => setUserAnswers([answer, ...state.userAnswers]);

    // Getters
    const questions = computed(() => state.questions);
    const userAnswers = computed(() => state.userAnswers);
    const currentQuestion = computed(() => getNextUnansweredQuestion(state.questions));
    const isGamePlaying = computed(() => state.gameState === GameState.Playing);
    const isGameFinished = computed(() => state.gameState === GameState.Finished);

    return {
        questions,
        userAnswers,
        currentQuestion,
        isGamePlaying,
        isGameFinished,
        startGame,
        endGame,
        resetGame,
        addQuestions,
        addUserAnswer,
    };
};
