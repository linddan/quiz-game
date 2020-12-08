import { reactive, computed } from 'vue';
import { UseGameState, GameState, Question, UserAnswer, UseGame } from '@/types/types';
import { getNextUnansweredQuestion } from '@/utils/game';

const state: UseGameState = reactive({
    gameState: GameState.NotStarted,
    questions: [],
    lifelines: [],
});

export default (): UseGame => {
    // Mutations
    const setGameState = (gameState: GameState) => (state.gameState = gameState);
    const setQuestions = (questions: Question[]) => (state.questions = questions);

    // Actions
    const startGame = () => setGameState(GameState.Playing);
    const endGame = () => setGameState(GameState.Finished);
    const resetGame = () => setGameState(GameState.NotStarted);
    const addQuestions = (questions: Question[]) => setQuestions(questions);
    const addAnswer = (questionId: string, answer: UserAnswer) => {
        setQuestions([]);
        // TBD
    };

    // Getters
    const questions = computed(() => state.questions);
    const nextQuestion = computed(() => getNextUnansweredQuestion(state.questions));
    const isNotGameStarted = computed(() => state.gameState === GameState.NotStarted);
    const isGameFinished = computed(() => state.gameState === GameState.Finished);

    return {
        questions,
        nextQuestion,
        isNotGameStarted,
        isGameFinished,
        startGame,
        endGame,
        resetGame,
        addQuestions,
        addAnswer,
    };
};
