class AlbzFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${this.styles}</style><div class="albz-footer"></div>`;
    this.container = this.shadowRoot.querySelector('.albz-footer');
  }

  static get observedAttributes() {
    return ['copyright', 'description', 'version'];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // Execute code when the component is disconnected from the DOM
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  render() {
    this.container.innerHTML = `
            <p>${this.copyright} | ${this.description}</p>
        `;
  }

  get styles() {
    return `
           .albz-footer {
              text-align: center;
              color:white;
           }
        `;
  }
}

customElements.define('albz-footer', AlbzFooter);
export default AlbzFooter;
