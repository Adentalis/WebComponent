const template = document.createElement("template");
template.innerHTML = `
<style>

.component {
  display: grid;
  grid-gap: 10px;
  background-color: #eee;
  margin: 10px;
  padding: 10px;
}

.component a {
  color: #555;
  align-self: center;
  justify-self: end;
}

.row {
  display: grid;
  grid-template-columns: 70px repeat(5, 1fr);
  grid-gap: 10px;
}

.validate{
  border-color: red;
  border-radius: 8px;
  height:25px;
}

.validate:focus{
  outline:0;
}

#address {
  font-weight: bold;
  font-size: 20px;
  color: #aaa;
}

#plz-label {
  grid-column: 1/2;
}

#plz-input {
  grid-column: 2/3;
}
#city-label {
  grid-column: 3/4;
}
#city-input {
  grid-column: 4/7;
}

#street-label {
  grid-column: 1/2;
}
#streets-select {
  grid-column: 2/5;
}
#nr-label {
  grid-column: 5/6;
}
#nr-input {
  grid-column: 6/7;
}

#country-label {
  grid-column: 1/2;
}
#country-input {
  grid-column: 2/7;
}

@media (max-width: 600px) {
  .row {
    grid-template-columns: 100px 1fr;
  }

  #address {
    font-weight: bold;
    font-size: 20px;
  }

  #city-label {
    grid-column: 1/2;
  }
  #city-input {
    grid-column: 2/3;
  }

  #street-label {
    grid-column: 1/2;
  }
  #streets_select {
    grid-column: 2/3;
  }
  
  #nr-label {
    grid-column: 1/2;
  }
  #nr-input {
    grid-column: 2/3;
  }
}
</style>
<div class="component">
    <div id="address" class="row">
      <a>Adresse</a>
    </div>

    <div id="city" class="row">
      <a id="plz-label">PLZ</a>
       <input id="plz-input" class="validate" type="number" min="0" max="99999"/>
       <a id="city-label">Stadt</a>
       <input id="city-input" class="validate"/>
    </div>

     <div id="street" class="row">
      <a id="street-label">Straße</a>
      <select id="streets-select" class="validate"></select>
      <a id="nr-label">Hausnummer</a>
      <input id="nr-input" type="number" class="validate"/>
     </div>

    <div id="country" class="row">
      <a id="country-label">Land</a>
      <input id="country-input" value="Deutschland" />
    </div>

    <div id="information" >
    <button type="button" id="info">Info</button>
    <button type="button" id="test">Test</button>
    </div>

  </div>
`;

class AddressComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#info")
      .addEventListener("click", () => this.printData());

    this.shadowRoot
      .querySelector("#test")
      .addEventListener("click", () => this.testAjax());

    this.shadowRoot
      .querySelector("#plz-input")
      .addEventListener("input", () => this.checkInput());
  }

  checkInput() {
    const input = this.shadowRoot.querySelector("#plz-input");
    var plz = input.value;

    if (plz.length > 5) {
      input.value = plz.slice(0, 5);
    } else {
      console.log(plz);
    }
  }

  printData() {
    const data = {
      zip: this.shadowRoot.querySelector("#plz-input").value,
      city: this.shadowRoot.querySelector("#city-input").value,
      street: this.shadowRoot.querySelector("#streets-select").value,
      houseNumber: this.shadowRoot.querySelector("#nr-input").value,
      country: "de",
    };
    alert(JSON.stringify(data, null, 2));
  }

  testAjax() {
    console.log("do ajax call");
    const corsHelper = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://www.postdirekt.de/plzserver/PlzAjaxServlet?autocomplete=plz&plz_city=Tr";
    var avoidCorsURL = corsHelper + url;

    const testAPIURL = "https://jsonplaceholder.typicode.com/todos/1";
    var xhrObject = new XMLHttpRequest();
    xhrObject.this = this;
    xhrObject.onreadystatechange = () => {
      if (xhrObject.readyState === 4) {
        if (xhrObject.status === 200 || xhrObject.status === 304) {
          // Success! Do stuff with data.
          console.log(xhrObject.responseText);
          this.shadowRoot.querySelector("#city-input").value =
            xhrObject.responseText;
        }
      }
    };

    xhrObject.open("GET", testAPIURL, true);
    xhrObject.send();
  }
}

window.customElements.define("address-component", AddressComponent);
