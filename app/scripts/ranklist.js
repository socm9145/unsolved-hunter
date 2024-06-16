const ext = window.browser || window.chrome;

const navElement = document.querySelector('.nav-pills');
const tableElement = document.querySelector('.table-responsive');

if (navElement && tableElement) {
  const registerButton = createRegisterButton();
  const refreshButton = createRefreshButton();
  navElement.appendChild(registerButton);
  navElement.appendChild(refreshButton);
} else {
  console.error('Cannot find the elements');
}

function createRegisterButton() {
  const li = document.createElement('li');
  li.className = 'register-button';
  // add register event
  const a = document.createElement('a');
  a.innerText = '헌터 등록';
  a.addEventListener('click', function (event) {
    event.preventDefault();
    const links = tableElement.querySelectorAll('a[href^="/user/"]');
    const userList = Array.from(links).map((link) =>
      link.href.split('/').pop()
    );
    // alert the result
    if (userList.length > 0) {
      ext.storage.local.set({ userList: userList }, () => {
        if (ext.runtime.lastError) {
          window.alert('헌터 등록 실패');
        } else {
          window.alert('헌터 ' + userList.length + '명 등록 완료');
        }
      });
    } else {
      window.alert('등록할 헌터가 없습니다.');
    }
  });
  li.appendChild(a);
  return li;
}

function createRefreshButton() {
  const li = document.createElement('li');
  li.className = 'refresh-button';
  // add refresh event
  const a = document.createElement('a');
  a.innerText = '헌터 초기화';
  a.addEventListener('click', function (event) {
    event.preventDefault();
    ext.storage.local.set({ userList: [] }, () => {
      if (ext.runtime.lastError) {
        window.alert('헌터 초기화 실패');
      } else {
        window.alert('헌터 초기화 완료');
      }
    });
  });
  li.appendChild(a);
  return li;
}
