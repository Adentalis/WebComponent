const template = document.createElement("template");
template.innerHTML = `
<style>
    .component {
      display: grid;
      grid-gap: 10px;
      background-color: #eee;
      margin: 10px;
      padding:10px;
    }

    .component a {
      color: #555;
    }

    #address {
      color: #333;
      font-weight: bold;
      font-size: 20px;
    }
    
</style>
<div class="component">
<div id="address">
  <a>Adresse</a>
</div>

<div id="city">
  <a id="plz_Label">PLZ</a>
  <input id="plz_Input" type="number" />
  <a id="city_Label">Stadt</a>
  <input id="city_Input" />
</div>

<div id="street">
  <a id="street_Label">Straße</a>
  <select id="streets_Select"></select>
  <a id="nr_Label">Hausnummer</a>
  <input id="nr_Input" type="number" />
</div>

<div id="country">
  <a id="country_Label">Land</a>
  <input id="country_Input" />
</div>
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
