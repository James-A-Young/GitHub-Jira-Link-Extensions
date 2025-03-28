const JiraSettingName = 'jiraInstance';

chrome.storage.sync.get({ jiraInstance: null }, (items) => {

    if (!items.jiraInstance) {
        console.warn('Jira URL is not set. Please update the extension options.');
        console.log(items);
        return;
    }

    const replaceJiraReferences = (newUrl: string | null) => {
        console.log('Replacing Jira references...');
        const issueBody = document.querySelector('.markdown-title');
        if (issueBody) {
            // Regular expression to find Jira issue references (e.g., "PROJ-123").
            const jiraIssueRegExp = /\b[A-Z]+-[0-9]+\b[^"<]/g;
            issueBody.innerHTML = issueBody.innerHTML.replace(jiraIssueRegExp, (match) => `<a href="https://${items.jiraInstance}.atlassian.net/browse/${match}" target="github-jira">${match}</a>`);
        }
    }
    let timeout: number | null = null
    const observer = new MutationObserver(() => {
        let newUrl = window.location.href;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            replaceJiraReferences(newUrl);
        }, 200);
    });

    observer.observe(document.getElementById('js-repo-pjax-container') as Element, { childList: true, subtree: false });

    replaceJiraReferences(null);
});