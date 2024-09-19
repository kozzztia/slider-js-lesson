


function createSlider(className, speed) {
    const slider = document.querySelector(className);
    const sliderCards = document.querySelectorAll(`${className} >*`);

    // Создаем списки слайдов и буллетов
    const sliderCardsList = createElement('ul');
    sliderCardsList.classList.add('cards-list');
    const sliderBulletList = createElement('ul');
    sliderBulletList.classList.add('bullets-list');

    sliderCards.forEach((item, i) => {
        const slide = createElement('li');
        slide.classList.add('slide');
        slide.append(item);
        sliderCardsList.appendChild(slide);

        const bullet = createElement('li');
        bullet.classList.add('bullet');
        const button = createElement('button');
        button.classList.add('button');
        button.innerText = i;

        bullet.append(button);
        sliderBulletList.appendChild(bullet);
    });

    slider.append(sliderCardsList, sliderBulletList);

    // Индексы для управления слайдами
    let prevIndex = 0;
    let activeIndex = 1;
    let nextIndex = 2;
    const slides = document.querySelectorAll(`${className} .cards-list li`);
    const bullets = document.querySelectorAll(`${className} .bullets-list li`);

    function updateSlider() {
        slides.forEach((item) => item.classList.remove('prev', 'active', 'next'));
        bullets.forEach((item) => item.classList.remove('prev', 'active', 'next'));

        slides[prevIndex].classList.add('prev');
        slides[activeIndex].classList.add('active');
        slides[nextIndex].classList.add('next');

        bullets[prevIndex].classList.add('prev');
        bullets[activeIndex].classList.add('active');
        bullets[nextIndex].classList.add('next');
    }

    function generateIndex(num, length) {
        return (num + 1) % length;
    }

    function renderSlider() {
        prevIndex = generateIndex(prevIndex, slides.length);
        activeIndex = generateIndex(activeIndex, slides.length);
        nextIndex = generateIndex(nextIndex, slides.length);

        updateSlider();
    }

    // Добавляем кликабельные буллеты
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            // При клике на буллет обновляем индексы
            prevIndex = (index - 1 + slides.length) % slides.length;
            activeIndex = index;
            nextIndex = (index + 1) % slides.length;

            updateSlider();
        });
    });

    // Запуск автоматического переключения, если указан speed
    if (speed) setInterval(renderSlider, speed);

    // Инициализация первой отрисовки слайдера
    updateSlider();
}

createSlider('.banner');
createSlider('.profile');
createSlider('.show');

// Вспомогательные функции
function createElement(tag) {
    return document.createElement(tag);
}