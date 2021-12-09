import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connectedCallback", this);
    const options = typeof App === "function" ? App.options : App;
    const propsList: string[] = Array.isArray(options.props)
      ? options.props
      : Object.keys(options.props || {});

    const props: { [index: string]: string } = {};
    // Validate, if all props are present
    for (const prop of propsList) {
      const propValue =
        process.env.NODE_ENV === "development"
          ? process.env[`VUE_APP_${prop.toUpperCase()}`]
          : this.attributes.getNamedItem(prop)?.value;

      if (!propValue) {
        console.error(`Missing attribute ${prop}`);
        return;
      }

      props[prop] = propValue;
    }

    const app = createApp(App, props);
    console.log("props", props, app);

    app.use(router);

    // const root = document.createElement("div");
    // this.appendChild(root);

    const root = this.attachShadow({ mode: "open" });
    const appMountPoint = document.createElement("div");
    root.appendChild(appMountPoint);

    app.mount(appMountPoint);
  }
}

window.customElements.define("wc-test", CustomElement);
// createApp(App).use(router).mount("#app");
