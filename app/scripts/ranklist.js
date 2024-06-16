const ext = window.browser || window.chrome;

const navElement = document.querySelector('.nav-pills');
const tableElement = document.querySelector('.table-responsive');

if (navElement && tableElement) {
  const li = document.createElement('li');
  li.className = 'active';
  li.style.cursor = 'pointer';

  const a = document.createElement('a');
  a.innerText = '헌터 등록';
  a.addEventListener('click', function (event) {
    event.preventDefault();
    const links = tableElement.querySelectorAll('a[href^="/user/"]');
    const userList = Array.from(links).map((link) =>
      link.href.split('/').pop()
    );

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
  navElement.appendChild(li);
} else {
  console.error('Cannot find the elements');
}
