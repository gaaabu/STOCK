const carousel = document.querySelector('.carousel');
let boxes = document.querySelectorAll('.box1');
let currentIndex = 1;
const boxWidth = boxes[0].offsetWidth + 20;

function initializeCarousel() {
    const firstClone = boxes[0].cloneNode(true);
    const lastClone = boxes[boxes.length - 1].cloneNode(true);
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, boxes[0]);

    boxes = document.querySelectorAll('.box1');
    carousel.style.transform = `translateX(-${boxWidth}px)`;

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex++;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentIndex * boxWidth}px)`;

        if (currentIndex === boxes.length - 1) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 1;
                carousel.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
            }, 500);
        }
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex--;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentIndex * boxWidth}px)`;

        if (currentIndex === 0) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = boxes.length - 2;
                carousel.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
            }, 500);
        }
    });
}

function fetchRecentItems() {
    fetch('data/fetch_recent_items.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            carousel.innerHTML = ''; 

            data.forEach(item => {
                const box = document.createElement('div');
                box.classList.add('box1');
                box.innerHTML = `
                    <h3>${item.item_name}</h3>
                    <p>Quantity: ${item.qty}</p>
                    <p>${item.action}</p>
                `;
                carousel.appendChild(box);
            });

            initializeCarousel(); 
        })
        .catch(error => console.error('Error fetching recent items:', error));
}

window.onload = function () {
    fetchRecentItems(); 
    initializeCarousel(); 
};