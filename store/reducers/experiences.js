import * as actions from "../actions/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  error: null,
  loading: false,
  experiences: null,
};

// ADD EXPERIENCE
const addExperienceStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const addExperienceSuccess = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      loading: false,
      ...action.payload,
    };
    return nextState;
  } else {
    return {
      ...state,
      loading: false,
    };
  }
};

const addExperienceFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload,
  };
};

const addExperienceEnd = (state) => {
  return {
    ...state,
    loading: false,
  };
};

// GET EXPERIENCES
const getExperiencesStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const getExperiencesSuccess = (state, payload) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       loading: false,
//       experiences: payload,
//       ...action.payload,
//     };
//     return nextState;
//   } else {
//     return {
//       ...state,
//       experiences: payload,
//       loading: false,
//     };
//   }
    return {
      ...state,
      experiences: payload,
      loading: false,
    };
};

const getExperiencesFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload,
  };
};

const getExperiencesEnd = (state) => {
  return {
    ...state,
    loading: false,
  };
};

export default (state = initialState, { type, payload }, action) => {
  switch (type) {
    case actions.ADD_EXPERIENCE_START:
      return addExperienceStart(state);

    case actions.ADD_EXPERIENCE_SUCCESS:
      return addExperienceSuccess(state);

    case actions.ADD_EXPERIENCE_FAIL:
      return addExperienceFail(state, payload);

    case actions.ADD_EXPERIENCE_END:
      return addExperienceEnd(state, payload);

    case actions.GET_EXPERIENCES_START:
      return getExperiencesStart(state);

    case actions.GET_EXPERIENCES_SUCCESS:
      return getExperiencesSuccess(state, payload);

    case actions.GET_EXPERIENCES_FAIL:
      return getExperiencesFail(state, payload);

    case actions.GET_EXPERIENCES_END:
      return getExperiencesEnd(state);

    default:
      return state;
  }
};
