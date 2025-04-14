import { whenReady } from 'ravyn-framework'
import { setApplicationMenu } from './menu.js'

whenReady(() => {
    setApplicationMenu()
})