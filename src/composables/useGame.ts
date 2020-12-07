import { reactive, computed } from 'vue';
import { UseGameState, GameState, Question, UserAnswer, UseGame } from '@/types/types';

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
    const startGame = () => {
        setGameState(GameState.Playing);
    };
    const endGame = () => {
        setGameState(GameState.Finished);
    };
    const resetGame = () => {
        setGameState(GameState.NotStarted);
    };
    const addQuestions = (questions: Question[]) => setQuestions(questions);
    const addAnswer = (questionId: string, answer: UserAnswer) => {
        setQuestions([]);
        // TBD
    };

    // Getters

    return {
        questions: computed(() => state.questions),
        startGame,
        endGame,
        resetGame,
        addQuestions,
        addAnswer,
    };
};
