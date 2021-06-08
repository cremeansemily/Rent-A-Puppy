const msgContainerEls = document.querySelectorAll('#collapse-handler');

msgContainerEls.forEach(el => {
    let open = false;
    el.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target.matches('img')) {

            const targetID = event.target.parentElement.dataset.collapseTarget;
            const div = document.getElementById('collapse-target-' + targetID);
            if (open === false) {
                open = true
                showElement(div);
                return
            } if (open === true) {
                open = false
                hideElement(div);
                return
            }
        }
    })
})

function showElement(element) {
    return element.removeAttribute('style');
}
function hideElement(element) {
    return element.setAttribute('style', "visibility: hidden; display: none;");
}