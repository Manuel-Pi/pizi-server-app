
import "./main.less"
import React from "react"
import ReactDOM from 'react-dom/client'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAdn } from "@fortawesome/free-brands-svg-icons/faAdn"
import { faBinoculars } from '@fortawesome/free-solid-svg-icons/faBinoculars'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar'
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog'
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff'
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff'
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons/faFlagCheckered'
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan'
import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase'
import { faPlug } from '@fortawesome/free-solid-svg-icons/faPlug'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons/faShieldAlt'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { faGhost } from '@fortawesome/free-solid-svg-icons/faGhost'
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug'
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash'
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'

import { App } from "./App"
// Add custom icon to Font Awesome
library.add(faCheck, 
            faBars, 
            faTimes, 
            faHome,
            faPlus,
            faSignOutAlt,
            faSignInAlt,
            faMinus,
            faPuzzlePiece,
            faList,
            faUsers,
            faChartBar,
            faUserCog,
            faToggleOff,
            faToggleOn,
            faAngleRight,
            faAngleLeft,
            faInfo,
            faPowerOff,
            faRedo,
            faFlagCheckered,
            faShieldAlt,
            faDatabase,
            faPlug,
            faBinoculars,
            faBan,
            faUser,
            faServer,
            faAdn,
            faGhost,
            faBug,
            faEye,
            faEyeSlash,
            faCircle,
            faArrowRight)
// Used for webpack to load less
!!React
// Init Socket,io
declare const io: any
// Get Socket.io
let socket = io('/pizi-server')
const root = ReactDOM.createRoot(document.getElementsByTagName("app")[0])
root.render(<App socket={socket}/>)