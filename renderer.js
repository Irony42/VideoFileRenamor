document.addEventListener('DOMContentLoaded', () => {
    const folderInput = document.getElementById('folderInput');
    const renameButton = document.getElementById('renameButton');

    renameButton.addEventListener('click', () => {
        Object.values(folderInput.files).forEach(file => {
            window.api.send('start-renaming', file.path);
        });
        window.alert('Videos have been renamed!');
    });
});
