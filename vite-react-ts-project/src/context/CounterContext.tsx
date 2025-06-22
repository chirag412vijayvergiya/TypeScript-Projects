import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ChangeEvent,
  type ReactElement,
} from "react";

// ---------- Types ----------

type CounterState = {
  count: number;
};

type TextState = {
  text: string;
};

export const counterInitState: CounterState = { count: 0 };
export const textInitState: TextState = { text: "" };

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

// ---------- Counter Context ----------

type CounterAction = {
  type: REDUCER_ACTION_TYPE.INCREMENT | REDUCER_ACTION_TYPE.DECREMENT;
};

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      throw new Error("Unhandled counter action");
  }
};

const CounterContext = createContext<{
  state: CounterState;
  increment: () => void;
  decrement: () => void;
}>({
  state: counterInitState,
  increment: () => {},
  decrement: () => {},
});

function CounterProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(counterReducer, counterInitState);

  const increment = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }),
    []
  );

  return (
    <CounterContext.Provider value={{ state, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}

type useCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void,
}

function useCounter(): useCounterHookType {
    const context = useContext(CounterContext);
    if (!context)
        throw new Error("useCounter must be used within a CounterProvider");

    const { state: {count}, increment, decrement } = context;
    return {
        count,
        increment,
        decrement,
    };
}

// ---------- Text Context ----------

type TextAction = {
  type: REDUCER_ACTION_TYPE.NEW_INPUT;
  payload: string;
};

const textReducer = (state: TextState, action: TextAction): TextState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload };
    default:
      throw new Error("Unhandled text action");
  }
};

const TextContext = createContext<{
  state: TextState;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
}>({
  state: textInitState,
  handleTextInput: () => {},
});

function TextProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(textReducer, textInitState);

  const handleTextInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
    },
    []
  );

  return (
    <TextContext.Provider value={{ state, handleTextInput }}>
      {children}
    </TextContext.Provider>
  );
}

type UseTextHookType = {
  text: string;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
};


function useText(): UseTextHookType {
  const context = useContext(TextContext);
  if (!context)
    throw new Error("useText must be used within a TextProvider");
  const { state, handleTextInput } = context;
  return {
    text: state.text,
    handleTextInput,
  };
}

// ---------- Optional Combined Provider ----------

function AppContextProvider({ children }: { children: ReactElement }) {
  return (
    <CounterProvider>
      <TextProvider>{children}</TextProvider>
    </CounterProvider>
  );
}

// ---------- Exports ----------

export {
  CounterProvider,
  useCounter,
  TextProvider,
  useText,
  AppContextProvider,
};
