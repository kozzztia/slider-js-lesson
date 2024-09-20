function createSlider(options = {pagination: false, navigation : false, }) {
    const { className, speed, height, pagination, navigation } = options;

    const slider = document.querySelector(className);
    const sliderCards = document.querySelectorAll(`${className} >*`);

    // Создаем список слайдов
    const sliderCardsList = createElement('ul');
    sliderCardsList.classList.add('cards-list');
    sliderCardsList.style.height = height;

    // Создаем список буллетов только если pagination = true
    let sliderBulletList = null;
    if (pagination) {
        sliderBulletList = createElement('ul');
        sliderBulletList.classList.add('bullets-list');
    }

    // Создаем сами слайды и буллеты (если pagination)
    sliderCards.forEach((item, i) => {
        const slide = createElement('li');
        slide.classList.add('slide');
        item.classList.add('card');
        slide.append(item);
        sliderCardsList.appendChild(slide);

        if (pagination) {
            const bullet = createElement('li');
            bullet.classList.add('bullet');
            const button = createElement('button');
            button.classList.add('button');
            button.innerText = i + 1;

            bullet.append(button);
            sliderBulletList.appendChild(bullet);
        }
    });

    // Добавляем слайды в слайдер
    slider.append(sliderCardsList);

    // Добавляем буллеты, если pagination включен
    if (pagination) {
        slider.append(sliderBulletList);
    }

    // Добавляем кнопки prev и next, если navigation включен
    let prevButton = null;
    let nextButton = null;
    if (navigation) {
        prevButton = createElement('button');
        prevButton.classList.add('prev-button');
        prevButton.innerText = '◄';
        nextButton = createElement('button');
        nextButton.classList.add('next-button');
        nextButton.innerText = '►';

        slider.append(prevButton, nextButton);
    }

    // Индексы для управления слайдами
    let prevIndex = 0;
    let activeIndex = 1;
    let nextIndex = 2;
    const slides = document.querySelectorAll(`${className} .cards-list li`);
    let bullets = null;
    if (pagination) {
        bullets = document.querySelectorAll(`${className} .bullets-list li`);
    }

    // Функция обновления слайдов
    function updateSlider() {
        slides.forEach((item) => item.classList.remove('prev', 'active', 'next'));
        if (pagination) {
            bullets.forEach((item) => item.classList.remove('prev', 'active', 'next'));
        }

        slides[prevIndex].classList.add('prev');
        slides[activeIndex].classList.add('active');
        slides[nextIndex].classList.add('next');

        if (pagination) {
            bullets[prevIndex].classList.add('prev');
            bullets[activeIndex].classList.add('active');
            bullets[nextIndex].classList.add('next');
        }
    }

    // Функции для генерации индексов
    function generateIndex(num, length) {
        return (num + 1) % length;
    }

    function generatePrevIndex(num, length) {
        return (num - 1 + length) % length;
    }

    // Функция для автоматического рендеринга
    function renderSlider() {
        prevIndex = generateIndex(prevIndex, slides.length);
        activeIndex = generateIndex(activeIndex, slides.length);
        nextIndex = generateIndex(nextIndex, slides.length);

        updateSlider();
    }

    // Добавляем кликабельные буллеты, если pagination включен
    if (pagination) {
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                prevIndex = (index - 1 + slides.length) % slides.length;
                activeIndex = index;
                nextIndex = (index + 1) % slides.length;

                updateSlider();
            });
        });
    }

    // Добавляем обработчики кликов на кнопки prev и next, если navigation включен
    if (navigation) {
        prevButton.addEventListener('click', () => {
            prevIndex = generatePrevIndex(prevIndex, slides.length);
            activeIndex = generatePrevIndex(activeIndex, slides.length);
            nextIndex = generatePrevIndex(nextIndex, slides.length);
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            renderSlider();  // Используем функцию для сдвига вперед
        });
    }

    // Запуск автоматического переключения, если указан speed
    if (speed > 0) setInterval(renderSlider, speed);

    // Инициализация первой отрисовки слайдера
    updateSlider();
    
}

// Примеры вызова слайдера
// Примеры вызова слайдера
createSlider(options = { className: '.banner', height: "800px", pagination: true,});  // Слайдер с пагинацией и кнопками
createSlider(options = { className: '.profile', height: "500px", navigation: true }); // Слайдер без пагинации и с кнопками
createSlider(options = { className: '.show', speed: 1500, height: "600px"});  // Слайдер с пагинацией, но без кнопок навигации

// Вспомогательные функции
function createElement(tag) {
    return document.createElement(tag);
}