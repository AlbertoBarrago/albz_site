/**
* This template is used by the gulpfile generator to generate the Web Component inside
* the js folder called components
* PLEASE DO NOT EDIT
*
* Once is created you can delete the commment
*
* @Author: Alberto Barrago
*/

class ${componentName} extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Your component initialization code here
    }

    connectedCallback() {
        // Execute code when the component is connected to the DOM
    }

    disconnectedCallback() {
        // Execute code when the component is disconnected from the DOM
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Execute code when an attribute is added, removed, or changed
    }
}

customElements.define('albz-${componentName.charAt(0).toLowerCase() + componentName.slice(1)}', ${componentName});
export default ${componentName};