"use strict";
(() => {
  // public/js/components/albzTheFold.js
  var AlbzTheFold = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `<style>${this.styles}</style><div class="albz-the-fold"></div>`;
      this.container = this.shadowRoot.querySelector(".albz-the-fold");
    }
    static get observedAttributes() {
      return ["title", "subtitle", "description", "linkedin-url", "github-url"];
    }
    connectedCallback() {
      this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (name === "title")
          this.title = newValue;
        if (name === "subtitle")
          this.subtitle = newValue;
        if (name === "description")
          this.description = newValue;
        if (name === "linkedin-url")
          this.linkedinUrl = newValue;
        if (name === "github-url")
          this.githubUrl = newValue;
      }
    }
    render() {
      this.container.innerHTML = `
            <h2 class="albz-the-fold__title">${this.title}</h2>
            <h3 class="albz-the-fold__subtitle">${this.subtitle}</h3>
            <p class="albz-the-fold__description">${this.description}</p>
            <div class="albz-the-fold__buttons">
                <a class="albz-the-fold__linkedin" href="${this.linkedinUrl}" target="_blank">LinkedIn</a>
                <a class="albz-the-fold__github" href="${this.githubUrl}" target="_blank">GitHub</a>
            </div>
        `;
    }
    get styles() {
      return `
            .albz-the-fold {
                background-color: #222;
                color: #fff;
                padding: 2rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 70vh;
            }

            .albz-the-fold__title {
                font-size: 2.5rem;
                margin: 0;
            }

            .albz-the-fold__subtitle {
                font-size: 1.5rem;
                margin: 0;
                margin-top: 0.5rem;
            }

            .albz-the-fold__description {
                font-size: 1.2rem;
                margin: 1rem 0;
            }

            .albz-the-fold__buttons {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }

            .albz-the-fold__linkedin,
            .albz-the-fold__github {
                display: inline-block;
                padding: 1rem 2rem;
                background-color: #0077B5; /* LinkedIn color */
                color: #fff;
                text-decoration: none;
                border: none;
                border-radius: 5px;
                font-size: 1.2rem;
            }

            .albz-the-fold__github {
                background-color: #333; /* GitHub color */
            }
        `;
    }
  };
  customElements.define("albz-the-fold", AlbzTheFold);
  var albzTheFold_default = AlbzTheFold;

  // public/js/index.js
  var app = {
    components: {
      albzTheFold: albzTheFold_default
    }
  };
  var js_default = app;
})();
