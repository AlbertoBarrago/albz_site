/**
 * Represents a custom element for displaying above the fold content.
 * AboveTheFold is a custom element for displaying above the fold content.
 *
 * @extends HTMLElement
 */
class AboveTheFold extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<style>${this.styles}</style><div class="albz-fold"></div>`;
        this.container = this.shadowRoot.querySelector('.albz-fold');
    }

    static get observedAttributes() {
        return ['title', 'subtitle', 'description', 'linkedin-user', 'github-user'];
    }

    get styles() {
        return `
            .albz-fold {
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

            .albz-fold__title {
                font-size: 2.5rem;
                margin: 0;
            }

            .albz-fold__subtitle {
                font-size: 1.5rem;
                margin: 0;
                margin-top: 0.5rem;
            }

            .albz-fold__description {
                font-size: 1.2rem;
                margin: 1rem 0;
            }

            .albz-fold__buttons {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }

            .albz-fold__linkedin,
            .albz-fold__github {
                display: inline-block;
                padding: 1rem 2rem;
                background-color: #0077B5; /* LinkedIn color */
                color: #fff;
                text-decoration: none;
                border: none;
                border-radius: 5px;
                font-size: 1.2rem;
            }

            .albz-fold__github {
                background-color: #333; /* GitHub color */
            }
        `;
    }

    connectedCallback() {
        this.render();

        const linkedinLink = this.shadowRoot.getElementById('linkedin');
        const githubLink = this.shadowRoot.getElementById('github');

        linkedinLink.addEventListener('click', () => {
            const username = this.getAttribute('linkedin-user');
            window.open(`https://www.linkedin.com/in/${username}`, '_blank');
        });

        githubLink.addEventListener('click', () => {
            const username = this.getAttribute('github-user');
            window.open(`https://github.com/${username}`, '_blank');
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
        }
    }

    render() {
        this.container.innerHTML = `
            <h2 class="albz-fold__title">${this.title}</h2>
            <h3 class="albz-fold__subtitle">${this.subtitle}</h3>
            <p class="albz-fold__description">${this.description}</p>
            <div class="albz-fold__buttons">
                <a class="albz-fold__linkedin" id="linkedin" href="#" target="_blank">
                  LinkedIn
                </a>
                  
                <a class="albz-fold__github" id="github" href="#" target="_blank">
                    Github
                </a>
            </div>
        `;
    }
}

customElements.define('albz-fold', AboveTheFold);
export default AboveTheFold;
