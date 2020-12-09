import { reactive, computed } from 'vue';
import { UseGameState, GameState, Question, UserAnswer, UseGame, Lifeline } from '@/types/types';
import { createFiftyFiftyLifeline, createPlusTenLifeline } from '@/utils/game';
import { orderBy } from 'lodash';

const state: UseGameState = reactive({
    gameState: GameState.NotStarted,
    questions: [],
    userAnswers: [],
    lifelines: [],
});

/*
 * * Composable serving as store for game-related functionality. Uses global state.
 */
export default (): UseGame => {
    //
    // Mutations
    //
    const setGameState = (gameState: GameState) => (state.gameState = gameState);
    const setQuestions = (questions: Question[]) => (state.questions = questions);
    const setUserAnswers = (userAnswers: UserAnswer[]) => (state.userAnswers = userAnswers);
    const setLifelines = (lifelines: Lifeline[]) => (state.lifelines = orderBy(lifelines, 'type'));

    //
    // Actions
    //
    // Starts the game
    const startGame = () => {
        setGameState(GameState.Playing);
        setLifelines([createFiftyFiftyLifeline(), createPlusTenLifeline()]);
    };
    // Ends the game
    const endGame = () => setGameState(GameState.Finished);
    // Resets the game
    const resetGame = () => {
        setGameState(GameState.NotStarted);
        setQuestions([]);
        setUserAnswers([]);
        setLifelines([]);
    };
    // Add a list of questions to be answered
    const addQuestions = (questions: Question[]) =>
        setQuestions([...questions, ...state.questions]);
    // Add a user answer for specific question
    const addUserAnswer = (answer: UserAnswer) => setUserAnswers([answer, ...state.userAnswers]);
    // Handles when user uses a lifeline
    const consumeLifeline = (lifelineId: string) => {
        const lifeline = state.lifelines.find((lifeline) => lifelineId === lifeline.id);
        if (lifeline) {
            const updatedLifeline = { ...lifeline, isUsed: true };
            const restLifelines = state.lifelines.filter((lifeline) => lifelineId !== lifeline.id);
            setLifelines([updatedLifeline, ...restLifelines]);
        }
    };

    //
    // Getters
    //
    const questions = computed(() => state.questions);
    const userAnswers = computed(() => state.userAnswers);
    const lifelines = computed(() => state.lifelines);
    const isGamePlaying = computed(() => state.gameState === GameState.Playing);
    const isGameFinished = computed(() => state.gameState === GameState.Finished);

    return {
        questions,
        userAnswers,
        lifelines,
        isGamePlaying,
        isGameFinished,
        startGame,
        endGame,
        resetGame,
        addQuestions,
        addUserAnswer,
        consumeLifeline,
    };
};
