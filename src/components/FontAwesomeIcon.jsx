/* Wrapped version of FontAwesomeIcon because Astro doesn't seem to work with the regular one in .astro files (I guess it needs the .jsx extension?) */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Importing all because this is build time and it's fine
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faDdLogoSquare } from './icons/faDdLogoSquare.js'

import { library, config } from '@fortawesome/fontawesome-svg-core'
library.add(fab, fas, faDdLogoSquare)
config.autoAddCss = false

export default function AwesomeReactIcon(props) {
  return <FontAwesomeIcon {...props} />
}