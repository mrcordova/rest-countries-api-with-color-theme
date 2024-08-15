let data = { test: "sdfadsf", num: 2 };
const btn = document.querySelector("#update");

function statusChange() {
  console.log("x1.currentStatus_value_is_changed" + x1.eventCurrentStatus);
}

var x1 = {
  eventCurrentStatus: undefined,
  get currentStatus() {
    return this.eventCurrentStatus;
  },
  set currentStatus(val) {
    this.eventCurrentStatus = val;
  },
};
console.log("eventCurrentStatus = " + x1.eventCurrentStatus);
x1.currentStatus = "create";
// console.log("eventCurrentStatus = " + x1.eventCurrentStatus);
// x1.currentStatus = "edit";
// console.log("eventCurrentStatus = " + x1.eventCurrentStatus);
// console.log("currentStatus = " + x1.currentStatus);
const HOME_TEMPLATE = makeTemplate(
  `<div class="home">
     <h1>${data.test}</h1>
     <br>
     This is a ${data.num} by me, Fletcher the dog. <br>
     My mom thought it was about time I have my own site
     <br>to share my adventures and offer my services.
     <br>
     <br>
     Unlike the Disney hit show "Dog with a Blog", I cannot talk.
     <br>
     But I do have remarkable typing skills, soulful eyes,<br> and an eye for hats. 
     <br>
   </div>`
);

function update(str, vars) {
  console.log(str, vars);
  str[0] += 'onchange="makeTempalte()"';
  //   temp.parentElement.addEventListener("change", (e) => {
  //     console.log(data.test);
  //   });
}

function makeTemplate(htmlText) {
  const template = document.createElement("template");
  template.innerHTML = htmlText;
  return template;
}

const clone = HOME_TEMPLATE.content.cloneNode(true);
document.getElementById("content").replaceChildren(clone);
const test = document.querySelector(".home");

test.addEventListener("change", (e) => {
  console.log(e);
});

btn.addEventListener("click", (e) => {
  data = { test: "dfasdfa", num: 3 };

  x1.currentStatus = "edit";
  console.log(x1.currentStatus);
});
