const ext = window.browser || window.chrome;

ext.storage.local.get(['userList'], (result) => {
  const userList = result.userList;
  const count = userList.length;
  const query = userList.map((user) => '!s@' + user).join(' ');
  console.log(count);
  console.log(query);
});

const formElement = document.querySelector('.col-md-8');

if (formElement) {
  const div = document.createElement('div');
  div.className = 'form-group';
  const title = createTitle();
  const form = createForm();
  div.appendChild(title);
  div.appendChild(form);
  formElement.appendChild(div);
}

function createTitle() {
  const label = document.createElement('label');
  label.className = 'control-label col-md-2';
  label.textContent = '문제 사냥';
  return label;
}

function createForm() {
  const div = document.createElement('div');
  div.className = 'col-md-10';
  const radioList = createRadioList();
  const input = createInput();
  const button = createButton();
  for (let i = 0; i < radioList.length; i++) {
    div.appendChild(radioList[i]);
  }
  div.appendChild(input);
  div.appendChild(button);
  return div;
}

function createRadioList() {
  const radioList = [];
  radioList.push(document.createElement('div'));
  for (let i = 0; i <= 5; i++) {
    radioList.push(document.createElement('div'));
    radioList[i].className = 'col-md-1';
  }
  for (let i = 1, imgNum = 1; i <= 5; i++, imgNum += 5) {
    const label = document.createElement('label');
    label.className = 'radio';
    radioList[i].appendChild(label);
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'po-tier-c';
    input.value = imgNum + '-a';
    if (i == 2) input.setAttribute('checked', '');
    label.appendChild(input);
    const img = document.createElement('img');
    img.src = `https://d2gd6pc034wcta.cloudfront.net/tier/${imgNum}-a.svg`;
    img.className = 'solvedac-tier';
    label.appendChild(img);
  }
  return radioList;
}

function createInput() {
  const div = document.createElement('div');
  div.className = 'col-md-3';
  const input = document.createElement('input');
  input.className = 'form-control';
  input.type = 'number';
  input.placeholder = '문제 개수';
  input.autocomplete = 'off';
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
  div.appendChild(input);
  return div;
}

function createButton() {
  const div = document.createElement('div');
  div.className = 'col-md-1';
  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = '사냥하기';
  button.addEventListener('click', function (event) {
    event.preventDefault();
  });
  div.appendChild(button);
  return div;
}
