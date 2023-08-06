
document.addEventListener('DOMContentLoaded', () => {
const draggableElement = document.querySelector('.draggable-element');

if (draggableElement) {
    let offsetX, offsetY;

    draggableElement.addEventListener('mousedown', (e) => {
    e.preventDefault();
    offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
    draggableElement.style.left = `${e.clientX - offsetX}px`;
    draggableElement.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    }
}

});
