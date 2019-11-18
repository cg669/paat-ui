
import { action } from '@storybook/addon-actions'
import { color } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Icon } from '../../index'
import './stories.scss'


const allRes = `
arrow-double-down.svg
arrow-double-up.svg
arrow-left.svg
arrow-right.svg
arrow-up.svg
association-angle.svg
association.svg
circle-line.svg
close-fill.svg
close-line.svg
close.svg
config.json
coordinate-line.svg
date.svg
delete.svg
department.svg
dossier.svg
download.svg
duties.svg
edit-paper-line.svg
edit-pen-line.svg
email-line.svg
eye-close.svg
file-bg.svg
floor-line.svg
folder-line.svg
form-line.svg
help.svg
house-key-line.svg
house-line.svg
house-money-line.svg
icon_add.svg
icon_lock.svg
icon_unlock.svg
icon-add.svg
icon-reduce.svg
icona_reduce.svg
inverted order.svg
lable.svg
list-line.svg
loading.svg
logo.svg
logout.svg
more-line.svg
paper-line.svg
phone-line.svg
pic-line.svg
plus-line.svg
plus.svg
positive sequence.svg
power-line.svg
repulse.svg
refurbish-line.svg
right-line.svg
right.svg
satellite.svg
save-line.svg
search-line.svg
set-fill.svg
shop.svg
sort.svg
spin.svg
time-line.svg
upload.svg
warning-line.svg
notification_error.png
notification_success.png
notification_warn.png
customer-service-line.svg
eye-open.svg
top-line.svg
heart-fill.svg
trends-line.svg
collection-fill.svg
arrow-down.svg
shape-error.svg
shape-success.svg
shape-warning.svg
shape-processing.svg
shu-down.svg
shu-up.svg
information-line.svg
folder-full.svg
computer.svg
wxcode.svg
`

const svgs = allRes.split('\n').filter(x => x.includes('svg'))
const iconSrcs = svgs.map(x => x.replace('.svg', ''))

function copy(text: string) {
  const input = document.createElement('input')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

/* tslint:disable:no-bitwise */
const getRandomColor = () => '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)

const Icons = () => (
  <ul className="nm-story">
    {iconSrcs.map(src => {
      const initColor = color('Color', '#ffffff')
      const fill = initColor === '#ffffff' ? getRandomColor() : initColor
      return (
        // tslint:disable-next-line:jsx-no-lambda
        <li key={src} onClick={() => copy(src)}>
          <Icon src={src} style={{ fill }} size="lg" onClick={action('icon-click')} />
          <span>{src}</span>
        </li>
      )
    })}
  </ul>
)

storiesOf('图标', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      sidebar: `| 参数 | 说明 | 类型 | 默认值 |
      | --- | --- | --- | --- |
      | src | icon的图标地址 | any | - |
      | size | 大小 | sm md lg file | sm |`
    },
  })
  .add('常用', () => Icons())
