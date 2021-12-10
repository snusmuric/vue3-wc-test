# vue3-wc
This dummy app demonstrates wrapping the whole Vue 3 app (vue-cli) in a web 
component with shadow dom. Styles are injected into shadow dom 
(through the link tad) during the custom element creation.
Unfortunately, vue-cli doesn't support wrapping of the Vue 3 app into the
web component, only Vue 2 is supported.

Note: in dev mode (pnpm run dev) the app mounting as usual, to a div tag 
and there is no wrapping to WC occurred. 
Wrapping to WC happens in production build only (pnpm run build) .

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
