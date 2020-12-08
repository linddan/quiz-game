import { reactive, computed } from 'vue';
import { UseGameState, GameState, Question, UserAnswer, UseGame, Lifeline } from '@/types/types';
import {
    createFiftyFiftyLifeline,
    createPlusTenLifeline,
    getNextUnansweredQuestion,
} from '@/utils/game';
import { orderBy } from 'lodash';

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
    const setLifelines = (lifelines: Lifeline[]) => (state.lifelines = orderBy(lifelines, 'type'));
    // Actions
    const startGame = () => {
        setGameState(GameState.Playing);
        setLifelines([createFiftyFiftyLifeline(), createPlusTenLifeline()]);
    };
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
    const consumeLifeline = (lifelineId: string) => {
        const lifeline = state.lifelines.find((lifeline) => lifelineId === lifeline.id);
        if (lifeline) {
            const updatedLifeline = { ...lifeline, isUsed: true };
            const restLifelines = state.lifelines.filter((lifeline) => lifelineId !== lifeline.id);
            setLifelines([updatedLifeline, ...restLifelines]);
        }

        if (lifeline) {
            lifeline.isUsed = true;
        }
    };

    // Getters
    const questions = computed(() => state.questions);
    const userAnswers = computed(() => state.userAnswers);
    const lifelines = computed(() => state.lifelines);
    const currentQuestion = computed(() => getNextUnansweredQuestion(state.questions));
    const isGamePlaying = computed(() => state.gameState === GameState.Playing);
    const isGameFinished = computed(() => state.gameState === GameState.Finished);

    return {
        questions,
        userAnswers,
        lifelines,
        currentQuestion,
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
