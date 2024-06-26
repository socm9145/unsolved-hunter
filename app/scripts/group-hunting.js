const ext = global.browser || global.chrome;

function displayHunterCount() {
  // display how many hunters exist
  ext.storage.local.get(['userList'], (result) => {
    const userList = result.userList;
    let userCount = 0;
    if (userList != undefined) {
      userCount = userList.length;
    }
    const navElement = document.querySelector('.nav-pills');
    if (navElement) {
      const li = document.createElement('li');
      li.className = 'active';
      const a = document.createElement('a');
      a.innerText = `등록 헌터: ${userCount}명`;
      li.appendChild(a);
      navElement.appendChild(li);
    }
  });
}

function addGroupHuntingForm(parent, type) {
  // main elements for group random problem hunting
  const formElement = document.querySelector(parent);
  if (formElement) {
    formElement.querySelector('label').innerText = '문제 번호';
    const div = document.createElement('div');
    div.id = 'hunting-form';
    div.className = 'form-group';
    const title = createTitle();
    const form = createForm(type);
    div.appendChild(title);
    div.appendChild(form);
    formElement.appendChild(div);
  } else {
    console.error('Cannot find the elements');
  }
}

function createTitle() {
  const label = document.createElement('label');
  label.className = 'control-label col-md-2';
  label.textContent = '문제 사냥';
  return label;
}

function createForm(type) {
  const div = document.createElement('div');
  div.className = 'col-md-10';
  const radioList = createRadioList();
  const input = createInput(type);
  const button = createButton(type);
  for (let i = 0; i < radioList.length; i++) {
    div.appendChild(radioList[i]);
  }
  div.appendChild(input);
  div.appendChild(button);
  return div;
}

function createRadioList() {
  const tier = ['b', 's', 'g', 'p', 'd', 'r'];
  const radioList = [];
  radioList.push(document.createElement('div'));
  for (let i = 0; i <= 6; i++) {
    radioList.push(document.createElement('div'));
    radioList[i].className = 'col-md-1';
  }
  for (let i = 1, imgNum = 1; i <= 6; i++, imgNum += 5) {
    const label = document.createElement('label');
    label.className = 'radio';
    radioList[i].appendChild(label);
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'po-tier-c';
    input.value = `tier:${tier[i - 1]}`;
    if (i == 3) input.setAttribute('checked', '');
    label.appendChild(input);
    const img = document.createElement('img');
    img.src = `https://d2gd6pc034wcta.cloudfront.net/tier/${imgNum}-a.svg`;
    img.className = 'solvedac-tier';
    label.appendChild(img);
  }
  return radioList;
}

function createInput(type) {
  const div = document.createElement('div');
  div.className = 'col-md-3';
  const input = document.createElement('input');
  input.className = 'form-control';
  input.type = 'number';
  input.placeholder = '문제 개수';
  input.autocomplete = 'off';
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addGroupProblems(type);
    }
  });
  div.appendChild(input);
  return div;
}

function createButton(type) {
  const div = document.createElement('div');
  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = '사냥하기';
  button.addEventListener('click', (event) => {
    event.preventDefault();
    addGroupProblems(type);
  });
  div.appendChild(button);
  return div;
}

async function addGroupProblems(type) {
  const { tier, problemCount } = getInputValues();
  try {
    const query = await createGroupProblemQuery(tier);
    ext.runtime
      .sendMessage({
        feature: 'addGroupProblems',
        query,
        problemCount,
        type,
      })
      .then((response) => {
        const { problems } = response;
        // add problems to the workbook in Firefox
        if (ext == global.browser) {
          // choose the correct function for the type
          let addProblem = '';
          if (type === 'workbook') {
            addProblem = 'WorkbookProblem.addProblem(problemId);';
          } else if (type === 'practice') {
            addProblem = 'problem_add(problemId);';
          }
          // execute javascript: add problems
          const script = document.createElement('script');
          script.textContent = `
            (function() {
              const problems = ${JSON.stringify(problems)};
              problems.forEach((problemId) => {
                ${addProblem}
              });
            })();
          `;
          document.documentElement.appendChild(script);
          script.remove();
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function getInputValues() {
  // tier
  const form = document.getElementById('hunting-form');
  const selectedTier = form.querySelector('input[type="radio"]:checked');
  let tier = 'tier:b';
  if (selectedTier) {
    tier = selectedTier.value;
  }
  // problemCount
  const numberInput = form.querySelector('input[type="number"]');
  let problemCount = parseInt(numberInput.value);
  if (isNaN(problemCount)) {
    return { tier, problemCount: 0 };
  }
  problemCount = Math.trunc(problemCount);
  return { tier, problemCount };
}

function createGroupProblemQuery(tier) {
  return new Promise((resolve, reject) => {
    ext.storage.local.get(['userList'], (result) => {
      if (ext.runtime.lastError) {
        reject(ext.runtime.lastError);
        return;
      }
      const userList = result.userList;
      if (!userList) {
        resolve(tier);
        return;
      }
      const query = tier + ' ' + userList.map((user) => '!s@' + user).join(' ');
      resolve(query);
    });
  });
}

export { displayHunterCount, addGroupHuntingForm };
