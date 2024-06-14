const ext = window.browser || window.chrome;

ext.storage.local.get(['userCount', 'userQuery'], (result) => {
  console.log(result.userCount);
  console.log(result.userQuery);
});
