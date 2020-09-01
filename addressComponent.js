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

#address {
  font-weight: bold;
  font-size: 20px;
  color: #aaa;
}

#plz_Label {
  grid-column: 1/2;
}

#plz_Input {
  grid-column: 2/3;
}
#city_Label {
  grid-column: 3/4;
}
#city_Input {
  grid-column: 4/7;
}

#street_Label {
  grid-column: 1/2;
}
#streets_Select {
  grid-column: 2/5;
}
#nr_Label {
  grid-column: 5/6;
}
#nr_Input {
  grid-column: 6/7;
}

#country_Label {
  grid-column: 1/2;
}
#country_Input {
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

  #city_Label {
    grid-column: 1/2;
  }
  #city_Input {
    grid-column: 2/3;
  }

  #street_Label {
    grid-column: 1/2;
  }
  #streets_Select {
    grid-column: 2/3;
  }
  
  #nr_Label {
    grid-column: 1/2;
  }
  #nr_Input {
    grid-column: 2/3;
  }
}
</style>
<div class="component">
    <div id="address" class="row">
      <a>Adresse</a>
    </div>

    <div id="city" class="row">
      <a id="plz_Label">PLZ</a>
       <input id="plz_Input" type="number" />
       <a id="city_Label">Stadt</a>
       <input id="city_Input" />
    </div>

     <div id="street" class="row">
      <a id="street_Label">Straße</a>
      <select id="streets_Select"></select>
      <a id="nr_Label">Hausnummer</a>
      <input id="nr_Input" type="number" />
     </div>

    <div id="country" class="row">
      <a id="country_Label">Land</a>
      <input id="country_Input" />
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
      .querySelector("#plz_Input")
      .addEventListener("input", () => this.checkInput());
  }

  checkInput() {
    const input = this.shadowRoot.querySelector("#plz_Input");
    var plz = input.value;

    if (plz.length > 5) {
      input.value = plz.slice(0, 5);
    } else {
      console.log(plz);
    }
  }

  printData() {
    const data = {
      zip: this.shadowRoot.querySelector("#plz_Input").value,
      city: this.shadowRoot.querySelector("#city_Input").value,
      street: this.shadowRoot.querySelector("#streets_Select").value,
      houseNumber: this.shadowRoot.querySelector("#nr_Input").value,
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
          this.shadowRoot.querySelector("#city_Input").value =
            xhrObject.responseText;
        }
      }
    };

    xhrObject.open("GET", testAPIURL, true);
    xhrObject.send();
  }
}

function stateChanged(p1, p2) {
  if (xmlHttp.readyState == 4) {
    //do something with the response
  }
}

window.customElements.define("address-component", AddressComponent);
