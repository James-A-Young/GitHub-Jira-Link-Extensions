
const saveOptions = () => {
    const jiraInstance = (document.getElementById('jiraUrl') as HTMLInputElement).value;
    chrome.storage.sync.set({ jiraInstance: jiraInstance }, () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('statusMessage') as HTMLElement;
        status.textContent = 'Options saved.';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    });
};
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get({ jiraInstance: '{Update me}' }, (items) => {
        (document.getElementById('jiraUrl')as HTMLInputElement).value = items.jiraInstance;
    });
};
document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('DOMContentLoaded', () => { (document.getElementById('save') as HTMLInputElement).addEventListener('click', saveOptions); });