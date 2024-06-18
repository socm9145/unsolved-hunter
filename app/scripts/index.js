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

  const menuList = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
  const tier = ['b', 's', 'g', 'p', 'd', 'r'];
  for (let i = 0; i < 6; i++) {
    const a = document.createElement('a');
    a.innerText = menuList[i];
    a.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(menuList[i]);
      alert('tier:' + tier[i] + ' !s@' + getCurrentUserName());
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
