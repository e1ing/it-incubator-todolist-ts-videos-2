import {AppInitialStateType, appReducer, setErrorAC} from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setErrorAC("loading"))

    expect(endState.error).toBe("loading");
})