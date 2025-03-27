const JiraSettingName = 'jiraInstance';

chrome.storage.sync.get({ jiraInstance: null }, (items) => {
    if (!items.jiraInstance) {
        console.warn('Jira URL is not set. Please update the extension options.');
        console.log(items);
        return;
    }
    const issueBody = document.querySelector('.js-issue-title');
    if (issueBody) {
        // Regular expression to find Jira issue references (e.g., "PROJ-123").
        const jiraIssueRegExp = /\b[A-Z]+-\d+\b/g;
        issueBody.innerHTML = issueBody.innerHTML.replace(jiraIssueRegExp, (match) => `<a href="https://${items.jiraInstance}.atlassian.net/browse/${match}" target="github-jira">${match}</a>`);
    }
});