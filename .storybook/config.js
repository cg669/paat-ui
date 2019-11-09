import { configure, addParameters, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y';
import { setOptions } from '@storybook/addon-options'
import { withInfo } from '@storybook/addon-info'
// import { withKnobs } from '@storybook/addon-knobs'
import { addReadme } from 'storybook-readme';

import theme from './theme'

import './style.scss'

// import '../src/styles/'

addDecorator(withA11y);
addParameters({
    options: {
        isToolshown: false,
        showNav: true,
        isFullscreen: false,
        showAddonsPanel: true,
        showSearchBox: false,
        panelPosition: 'bottom',
        hierarchySeparator: /\./,
        hierarchyRootSeparator: /\|/,
        sidebarAnimations: true,
        enableShortcuts: false,
        theme: theme,
        storySort: (a, b) =>
            a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
    }
});

addDecorator((story, context) => withInfo()(story)(context))
// addDecorator(withKnobs)
addDecorator(addReadme);
setOptions({
    name: 'NM UI',
    url: '',
})
const req = require.context('../stories', true, /\.tsx?$/)

function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);