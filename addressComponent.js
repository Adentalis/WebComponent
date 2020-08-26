const template = document.createElement("template");
template.innerHTML = `
<style>
    .component{
        display:grid;
        background-color: #eee;
        margin: 10px;
    }
    #address{
        color: #333;
        font-weight: bold;
        font-size: 20px;
    }
    .component div{
        color: #555;
    }
</style>
<div class ="component">
    <div id="address"> Adresse</div>
    <div id="city"> PLZ </div>
    <div id="street"> Straße</div>
    <div id="country"> Land</div>

</div>

`;

class AddressComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("address-component", AddressComponent);
