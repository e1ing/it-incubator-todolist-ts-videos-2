import {AppInitialStateType, appReducer, setAppErrorAC} from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC("loading"))

    expect(endState.error).toBe("loading");
})