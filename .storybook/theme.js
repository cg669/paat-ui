import { create } from '@storybook/theming';

export default create({
    base: 'light',

    colorPrimary: 'black',
    colorSecondary: 'deepskyblue',

    // UI
    appBg: 'white',
    appContentBg: 'white',
    appBorderColor: 'grey',
    appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: 'silver',
    barSelectedColor: 'deepskyblue',
    // barBg: 'black',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandTitle: 'NM UI',
    brandUrl: '#',
    brandImage: 'https://fileserver.paat.com/10e/10e26929493bffe5a15ac69b3a2e642b.jpeg',
});