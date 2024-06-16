chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'addGroupProblems') {
    const { query, problemCount } = request;
    if (problemCount <= 0 || problemCount > 50) {
      sendResponse({ problems: [] });
      return false;
    }
    const url = `https://solved.ac/api/v3/search/problem?query=${query}&sort=solved&direction=desc&page=1`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const problems = responseJson.items
          .slice(0, problemCount)
          .map((x) => x.problemId);

        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: (problems) => {
            problems.forEach((problemId) => {
              WorkbookProblem.addProblem(problemId);
            });
          },
          args: [problems],
          world: 'MAIN',
        });
        sendResponse();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        sendResponse({ error: 'Failed to fetch data' });
      });

    return true;
  }
});
