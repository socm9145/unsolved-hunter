const ext = global.browser || global.chrome;

ext.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { feature } = request;
  if (feature === 'addGroupProblems') {
    const { query, problemCount, type } = request;
    if (problemCount < 1) {
      sendResponse({ problems: [] });
      return false;
    }
    // request problems
    const url = `https://solved.ac/api/v3/search/problem?query=${query}&sort=solved&direction=desc&page=1`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let problems = responseJson.items.map((x) => x.problemId);
        problems = shuffleArray(problems, problemCount);
        // add problems to the workbook in Chrome
        if (ext == global.chrome) {
          ext.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: (problems, type) => {
              problems.forEach((problemId) => {
                if (type === 'workbook') {
                  WorkbookProblem.addProblem(problemId);
                } else if (type === 'practice') {
                  problem_add(problemId, 1);
                }
              });
            },
            args: [problems, type],
            world: 'MAIN',
          });
        }
        sendResponse({ problems });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        sendResponse({ error: 'Failed to fetch data' });
      });
    // to keep the port open
    return true;
  } else if (feature === 'dailyHunting') {
    const { query } = request;
    const url = `https://solved.ac/api/v3/search/problem?query=${query}&sort=solved&direction=desc&page=1`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const problems = responseJson.items.map((x) => x.problemId);
        const random = Math.floor(Math.random() * problems.length);
        const problemId = problems[random];
        sendResponse({ problemId });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        sendResponse({ error: 'Failed to fetch data' });
      });
    // to keep the port open
    return true;
  }
});

// returns a shuffled array of length
function shuffleArray(array, length) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  length = Math.min(array.length, length);
  return array.slice(0, length);
}
