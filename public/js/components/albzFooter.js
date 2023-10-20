class AlbzFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${this.styles}</style><div class="albz-foooter"></div>`;
    this.container = this.shadowRoot.querySelector('.albz-footer');
  }

  static getObserverAttribute() {
    return ['copyright', 'description'];
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

  render() {}
}

customElements.define('footer', AlbzFooter);
