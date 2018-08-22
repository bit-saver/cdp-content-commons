import { DATE_CHANGE, TO_DATE_CHANGE, FROM_DATE_CHANGE, CLEAR_FILTERS } from '../actions/types';

const INITIAL_STATE = {
  from: new Date(),
  to: new Date(),
  list: [
    { key: 'recent', display_name: 'Most Recent' },
    {
      key: 'now-1d',
      display_name: 'Past 24 Hours'
    },
    {
      key: 'now-1w',
      display_name: 'Past Week'
    },
    {
      key: 'now-1M',
      display_name: 'Past Month'
    },
    {
      key: 'now-1y',
      display_name: 'Past Year'
    }
  ],
  currentDate: { key: 'recent', display_name: 'Most Recent' }
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case DATE_CHANGE:
      return {
        ...state,
        currentDate: action.payload ? action.payload : { key: 'recent', display_name: 'Most Recent' }
      };

    case FROM_DATE_CHANGE:
      return {
        ...state,
        from: action.payload
      };

    case TO_DATE_CHANGE:
      return {
        ...state,
        to: action.payload
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        currentDate: { key: 'recent', display_name: 'Most Recent' }
      };

    default:
      return state;
  }
};
