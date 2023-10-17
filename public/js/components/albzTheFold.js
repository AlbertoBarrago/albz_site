/**
 * Represents a custom element for displaying above the fold content.
 * AboveTheFold is a custom element for displaying above the fold content.
 *
 * @extends HTMLElement
 */
class AlbzTheFold extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${this.styles}</style><div class="albz-the-fold"></div>`;
        this.container = this.shadowRoot.querySelector('.albz-the-fold');
    }

    static get observedAttributes() {
        return ['title', 'subtitle', 'description', 'button-text', 'button-url', 'button-target', 'image-src'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue !== newValue) {
            if (name === 'title') this.title = newValue;
            if (name ==='subtitle') this.subtitle = newValue;
            if (name === 'description') this.description = newValue;
            if (name === 'button-text') this.buttonText = newValue;
            if (name === 'button-url') this.buttonUrl = newValue;
            if (name === 'image-src') this.imageSrc = newValue;
        }
    }

    render() {
        this.container.innerHTML = `
            <img class="albz-the-fold__image" src="${this.imageSrc}" alt="Profile Image">
            <h2 class="albz-the-fold__title">${this.title}</h2>
            <h3 class="albz-the-fold__subtitle">${this.subtitle}</h3>
            <p class="albz-the-fold__description">${this.description}</p>
            <a class="albz-the-fold__button" href="${this.buttonUrl}" target="${this.buttonTarget}">${this.buttonText}</a>
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
                height: 100vh;
            }

            .albz-the-fold__image {
                max-width: 100%;
                height: auto;
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

            .albz-the-fold__button {
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

            .albz-the-fold__button:hover {
                background-color: #ff3300;
            }
        `;
    }
}

customElements.define('albz-the-fold', AlbzTheFold);
export default AlbzTheFold;

