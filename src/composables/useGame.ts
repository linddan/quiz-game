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
    const addUserAnswer = (questionId: string, answer: UserAnswer) => {
        setQuestions([]);
        // TBD
    };

    // Getters
    const questions = computed(() => state.questions);
    const currentQuestion = computed(() => getNextUnansweredQuestion(state.questions));
    const isNotGameStarted = computed(() => state.gameState === GameState.NotStarted);
    const isGameFinished = computed(() => state.gameState === GameState.Finished);

    return {
        questions,
        currentQuestion,
        isNotGameStarted,
        isGameFinished,
        startGame,
        endGame,
        resetGame,
        addQuestions,
        addUserAnswer,
    };
};
