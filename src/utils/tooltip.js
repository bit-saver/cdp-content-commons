import colors from './colors';

// NOTE: using the react-lightweight-tooltip for now.  Need a more robust library or code our own
// Info about the styles: https://github.com/mcumpl/react-lightweight-tooltip
export default {
  wrapper: {
    cursor: 'pointer'
  },
  content: {
    backgroundColor: colors.darkGrey,
    color: colors.white,
    padding: 0
  },
  tooltip: {
    backgroundColor: colors.darkGrey,
    borderRadius: '1px',
    padding: '5px',
    lineHeight: 1.2,
    textAlign: 'center'
  },
  arrow: {
    borderTop: `solid ${colors.darkGrey} 8px`,
    bottom: '-8px',
    marginLeft: '-8px',
    borderLeft: 'solid transparent 8px',
    borderRight: 'solid transparent 8px'
  }
};
