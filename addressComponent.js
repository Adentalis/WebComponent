class AddressComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>
                                    div{color: #ccc;font-weight: bold;}
                                </style>
                                <div> Adresse</div>`;
  }
}

window.customElements.define("address-component", AddressComponent);
