/******************************************************************************/
// Initialization
/******************************************************************************/
const initialState = {
  rehydrateComplete: false
};

/******************************************************************************/
// Action Handlers
/******************************************************************************/
const handleRehydrate = (state, action) => {
  return {
    ...state,
    rehydrateComplete: true
  };
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const rehydrateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return handleRehydrate(state, action);
    default:
      return state;
  }
};
