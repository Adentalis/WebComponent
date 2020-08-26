const template = document.createElement("template");
template.innerHTML = `
<style>
    div{
        color: #ccc;
        font-weight: bold;
    }
</style>
<div> Adresse</div>
`;

class AddressComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("address-component", AddressComponent);
