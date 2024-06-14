const navElement = document.querySelector('.nav-pills');
const tableElement = document.querySelector('.table-responsive');

if (navElement && navElement) {
  const li = document.createElement('li');
  li.className = 'active';
  li.style.cursor = 'pointer';
  
  const a = document.createElement('a');
  a.innerText = '헌터 등록';
  a.addEventListener('click', function(event) {
    event.preventDefault();
    const links = tableElement.querySelectorAll('a[href^="/user/"]');
    const userList = [];
    links.forEach(link => {
      const user = link.href.split('/').pop();
      userList.push(user);
    });
    console.log('아이디 목록:', userList);
    window.alert('사용자 등록 완료: ' + userList.join(', '));
  });

  li.appendChild(a);
  navElement.appendChild(li);
} else {
  console.error('클래스 이름이 일치하는 요소를 찾을 수 없습니다.');
}