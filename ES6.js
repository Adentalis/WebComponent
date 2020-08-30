var a = 5;
console.log(a);

const daniel = new Promise((resolve, reject) => {
  resolve("Huuuu");
});

daniel.then((data) => {
  console.log(data);
});

@media (max-width: 800px) {
  .GridPage {
    -ms-grid-columns: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
  }
  #windowData {
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-column: 1/3;
  }
}