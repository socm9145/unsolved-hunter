const ext = global.browser || global.chrome;

// add daily single hunting feature
const navElement = document.querySelector('.navbar-nav');
if (navElement) {
  const title = createTitle();
  const menu = createMenu();
  title.appendChild(menu);
  navElement.insertBefore(title, navElement.firstChild);
} else {
  console.error('Cannot find the elements');
}

function createTitle() {
  const a = document.createElement('a');
  a.innerText = '오늘의 문제';

  const li = document.createElement('li');
  li.setAttribute('class', 'dropdown menu-title');
  li.appendChild(a);
  return li;
}

function createMenu() {
  const ul = document.createElement('ul');
  ul.className = 'dropdown-menu';
  // append tier menu
  const tier = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
  for (let i = 0; i < 6; i++) {
    const a = document.createElement('a');
    a.innerText = tier[i];
    a.addEventListener('click', (event) => {
      event.preventDefault();
      const query = 'tier:' + tier[i][0] + ' !s@' + getCurrentUserName();
      // get a problem and move
      ext.runtime
        .sendMessage({
          type: 'dailyHunting',
          query,
        })
        .then((response) => {
          const { problemId } = response;
          window.location.href = `https://www.acmicpc.net/problem/${problemId}`;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    const li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
  return ul;
}

function getCurrentUserName() {
  const loginBar = document.querySelector('.loginbar');
  const userName = loginBar.querySelector('.username').innerText;
  return userName;
}
