const template = document.createElement("template");
template.innerHTML = `
<style>
.component {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 70px repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background-color: #eee;
  margin: 10px;
  padding: 10px;
}

.component a {
  color: #555;
}

#address {
  color: #333;
  font-weight: bold;
  font-size: 20px;
  grid-row: 1/2;
  grid-column: 1/2;
}

#plz_Label {
  grid-column: 1/2;
  grid-row: 2/3;
}
#plz_Input {
  grid-column: 2/3;
  grid-row: 2/3;
}
#city_Label {
  grid-column: 3/4;
  grid-row: 2/3;
}
#city_Input {
  grid-column: 4/7;
  grid-row: 2/3;
}

#street_Label {
  grid-column: 1/2;
  grid-row: 3/4;
}
#streets_Select {
  grid-column: 2/5;
  grid-row: 3/4;
}
#nr_Label {
  grid-column: 5/6;
  grid-row: 3/4;
}
#nr_Input {
  grid-column: 6/7;
  grid-row: 3/4;
}

#country_Label {
  grid-column: 1/2;
  grid-row: 4/5;
}

#country_Input {
  grid-column: 2/7;
  grid-row: 4/5;
}
</style>
<div class="component">
<a id="address">Adresse</a>

<a id="plz_Label">PLZ</a>
<input id="plz_Input" type="number" />
<a id="city_Label">Stadt</a>
<input id="city_Input" />

<a id="street_Label">Straße</a>
<select id="streets_Select"></select>
<a id="nr_Label">Hausnummer</a>
<input id="nr_Input" type="number" />

<a id="country_Label">Land</a>
<input id="country_Input" />
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
