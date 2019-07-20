export interface BaseAction {
  type: string;
}

export interface Action<Payload> extends BaseAction {
  payload: Payload;
}

export interface ActionMeta<Payload, Meta> extends Action<Payload> {
  meta: Meta;
}

export interface Reducer<State, Payload, Meta> {
  pending: (state: State, action: ActionMeta<Payload, Meta>) => State;
  fulfilled: (state: State, action: ActionMeta<Payload, Meta>) => State;
  rejected: (state: State, action: ActionMeta<Payload, Meta>) => State;
}

export default function handleReducer<State, Payload, Meta = any>(
  typeName: string,
  initialState: State,
  reducer: Reducer<State, Payload, Meta>
) {
  return function(state = initialState, action: ActionMeta<Payload, Meta>) {
    const type = action.type;
    const { pending, fulfilled, rejected } = reducer;
    if (pending && typeName + "_PENDING" === type) {
      return pending(state, action);
    }

    if (fulfilled && typeName + "_FULFILLED" === type) {
      return fulfilled(state, action);
    }

    if (rejected && typeName + "_REJECTED" === type) {
      return rejected(state, action);
    }
    return state;
  };
}
