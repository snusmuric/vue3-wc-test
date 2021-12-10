import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

class CustomElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log('connectedCallback', this)
    const options = typeof App === 'function' ? App.options : App
    const propsList: string[] = Array.isArray(options.props)
      ? options.props
      : Object.keys(options.props || {})

    const props: { [index: string]: string } = {}
    // Validate, if all props are present
    for (const prop of propsList) {
      const propValue =
        process.env.NODE_ENV === 'development'
          ? process.env[`VUE_APP_${prop.toUpperCase()}`]
          : this.attributes.getNamedItem(prop)?.value

      if (!propValue) {
        console.error(`Missing attribute ${prop}`)
        return
      }

      props[prop] = propValue
    }

    const app = createApp(App, props)
    console.log('props', props, app)

    app.use(router)

    const root = this.attachShadow({ mode: 'open' })

    const styleLink = document.createElement('link')
    styleLink.setAttribute('href', 'css/app.css')
    styleLink.setAttribute('rel', 'stylesheet')
    root.appendChild(styleLink)

    const appMountPoint = document.createElement('div')
    root.appendChild(appMountPoint)

    waitForCssLoaded(styleLink).then((loaded) => {
      if (loaded) {
        app.mount(appMountPoint)
      } else {
        console.error("Can't load css: css/app.css")
      }
    })
  }
}

function isCssLinkLoaded(linkElem: HTMLLinkElement) {
  let cssLoaded = false
  try {
    if ((linkElem?.sheet?.cssRules?.length ?? 0) > 0) {
      cssLoaded = true
    } else if ((linkElem?.innerHTML?.length ?? 0) > 0) {
      cssLoaded = true
    }
  } catch (ex) {
    cssLoaded = false
  }
  return cssLoaded
}

async function waitForCssLoaded(linkElem: HTMLLinkElement) {
  if (isCssLinkLoaded(linkElem)) {
    return true
  }
  const pollPeriodicityMs = 50
  const maxWaitTimeMs = 10_000
  const maxAttempts = Math.ceil(maxWaitTimeMs / pollPeriodicityMs)
  let attemptCount = 0

  return new Promise<boolean>((resolve) => {
    const poller = setInterval(() => {
      attemptCount++
      if (isCssLinkLoaded(linkElem)) {
        clearTimeout(poller)
        return resolve(true)
      }
      if (attemptCount > maxAttempts) {
        clearTimeout(poller)
        return resolve(false)
      }
    })
  })
}

window.customElements.define('wc-test', CustomElement) // for prod only
// createApp(App).use(router).mount("#app"); // for dev
