import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import {
  fullBlack,
} from 'material-ui/styles/colors';

import colors from './colors';

const theme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  palette: {
    primary1Color: colors.allPorts1,
    primary2Color: colors.allPorts1,
    primary3Color: colors.black,
    accent1Color: colors.scarlet,
    accent2Color: colors.black,
    accent3Color: colors.allPorts1,
    textColor: colors.black,
    secondaryTextColor: fade(colors.black, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.black,
    disabledColor: fade(colors.black, 0.3),
    pickerHeaderColor: colors.blackPearl,
    clockCircleColor: fade(colors.black, 0.07),
    shadowColor: fullBlack,
  },
});

export default theme;
