"use strict";
(() => {
  // public/js/components/above_the_fold.js
  var AboveTheFold = class extends HTMLElement {
    /**
     * The observedAttributes variable is an array that stores the names of the HTML attributes that
     * the custom element observes for changes.
     *
     * @type {Array.<string>}
     */
    static observedAttributes = [
      "title",
      "subtitle",
      "description",
      "button-text",
      "button-url",
      "button-target"
    ];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    get title() {
      return this.getAttribute("title") || "";
    }
    set title(value) {
      this.setAttribute("title", value);
    }
    get subtitle() {
      return this.getAttribute("subtitle") || "";
    }
    set subtitle(value) {
      this.setAttribute("subtitle", value);
    }
    get description() {
      return this.getAttribute("description") || "";
    }
    set description(value) {
      this.setAttribute("description", value);
    }
    get buttonText() {
      return this.getAttribute("button-text") || "";
    }
    set buttonText(value) {
      this.setAttribute("button-text", value);
    }
    get buttonUrl() {
      return this.getAttribute("button-url") || "";
    }
    set buttonUrl(value) {
      this.setAttribute("button-url", value);
    }
    get buttonTarget() {
      return this.getAttribute("button-target") || "";
    }
    set buttonTarget(value) {
      this.setAttribute("button-target", value);
    }
    connectedCallback() {
      this.initDefaultValues();
      this.render();
    }
    disconnectedCallback() {
      this.innerHTML = "";
    }
    adoptedCallback() {
      this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
      this.render();
    }
    initDefaultValues() {
      if (!this.hasAttribute("title")) {
        this.title = "Default Title";
      }
      if (!this.hasAttribute("subtitle")) {
        this.subtitle = "Default Subtitle";
      }
      if (!this.hasAttribute("description")) {
        this.description = "Default Description";
      }
      if (!this.hasAttribute("button-text")) {
        this.buttonText = "Learn More";
      }
      if (!this.hasAttribute("button-url")) {
        this.buttonUrl = "#";
      }
      if (!this.hasAttribute("button-target")) {
        this.buttonTarget = "_self";
      }
    }
    render() {
      this.shadowRoot.innerHTML = `
            <style>
            .above-the-fold {
                background-color: #222;
                color: #fff;
                padding: 2rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }
        
            .above-the-fold__title {
                font-size: 2.5rem;
                margin: 0;
            }
        
            .above-the-fold__subtitle {
                font-size: 1.5rem;
                margin: 0;
                margin-top: 0.5rem;
            }
        
            .above-the-fold__description {
                font-size: 1.2rem;
                margin: 1rem 0;
            }
        
            .above-the-fold__button {
                display: inline-block;
                padding: 1rem 2rem;
                background-color: #ff6600;
                color: #fff;
                text-decoration: none;
                border: none;
                border-radius: 5px;
                font-size: 1.2rem;
                margin-top: 1rem;
            }
        
            .above-the-fold__button:hover {
                background-color: #ff3300;
            }
        </style>
            <div class="above-the-fold">
                <div class="above-the-fold__content">
                    <h2 class="above-the-fold__title">${this.title}</h2>
                    <h3 class="above-the-fold__subtitle">${this.subtitle}</h3>
                    <p class="above-the-fold__description">${this.description}</p>
                    <a class="above-the-fold__button" href="${this.buttonUrl}" target="${this.buttonTarget}">${this.buttonText}</a>
                </div>
            </div>
        `;
    }
  };
  customElements.define("above-the-fold", AboveTheFold);
  var above_the_fold_default = AboveTheFold;

  // public/js/index.js
  var app = {
    components: {
      "above-the-fold": above_the_fold_default
    }
  };
  var js_default = app;
})();
