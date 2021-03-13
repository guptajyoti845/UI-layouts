const allPanel = document.querySelectorAll('.panel');


allPanel.forEach(panel => {

    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    })
});

function removeActiveClasses() {
    allPanel.forEach(panel => {
        panel.classList.remove('active');
    })
}




