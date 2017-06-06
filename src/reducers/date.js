import {
  DATE_CHANGE,
  TO_DATE_CHANGE,
  FROM_DATE_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  dateSelect: '',
  from: new Date(),
  to: new Date(),
  options: [
    '',
    'now-24h',
    'now-1w',
    'now-1M',
    'now-1y',
    'custom'
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return {
        ...state,
        dateSelect: action.payload,
      };
    case FROM_DATE_CHANGE:
      return {
        ...state,
        from: action.payload,
      };
    case TO_DATE_CHANGE:
      return {
        ...state,
        to: action.payload
      };
    default:
      return state;
  }
};
