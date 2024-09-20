function createSlider(options = {pagination: false, navigation : false, }) {
    // Деструктуризация объекта опций, включая имя класса, скорость, высоту, пагинацию и навигацию
    const { className, speed, height, pagination, navigation } = options;

    // Получаем элемент слайдера по классу
    const slider = document.querySelector(className);
    // Получаем все элементы внутри слайдера, которые будут слайдами
    const sliderCards = document.querySelectorAll(`${className} >*`);

    // Создаем список (ul) для слайдов
    const sliderCardsList = createElement('ul');
    sliderCardsList.classList.add('cards-list'); // Добавляем класс для оформления
    sliderCardsList.style.height = height; // Устанавливаем высоту из параметров

    // Если пагинация включена, создаем список буллетов (ul)
    let sliderBulletList = null;
    if (pagination) {
        sliderBulletList = createElement('ul');
        sliderBulletList.classList.add('bullets-list'); // Добавляем класс для оформления
    }

    // Проходим по всем карточкам (слайдам) и создаем элементы для слайдера и буллетов
    sliderCards.forEach((item, i) => {
        const slide = createElement('li'); // Создаем элемент для слайда
        slide.classList.add('slide'); // Добавляем класс
        item.classList.add('card'); // Добавляем класс для оформления самой карточки
        slide.append(item); // Вставляем карточку внутрь слайда
        sliderCardsList.appendChild(slide); // Добавляем слайд в список слайдов

        // Если пагинация включена, создаем буллет для каждого слайда
        if (pagination) {
            const bullet = createElement('li'); // Создаем элемент для буллета
            bullet.classList.add('bullet'); // Добавляем класс
            const button = createElement('button'); // Создаем кнопку для буллета
            button.classList.add('button'); // Добавляем класс для кнопки
            button.innerText = i + 1; // Вставляем текст с номером слайда

            bullet.append(button); // Вставляем кнопку в буллет
            sliderBulletList.appendChild(bullet); // Добавляем буллет в список буллетов
        }
    });

    // Добавляем список слайдов в слайдер
    slider.append(sliderCardsList);

    // Если включена пагинация, добавляем список буллетов в слайдер
    if (pagination) {
        slider.append(sliderBulletList);
    }

    // Если включена навигация, создаем кнопки "prev" и "next" для переключения слайдов
    let prevButton = null;
    let nextButton = null;
    if (navigation) {
        prevButton = createElement('button'); // Кнопка для предыдущего слайда
        prevButton.classList.add('prev-button'); // Добавляем класс
        prevButton.innerText = '◄'; // Текст на кнопке

        nextButton = createElement('button'); // Кнопка для следующего слайда
        nextButton.classList.add('next-button'); // Добавляем класс
        nextButton.innerText = '►'; // Текст на кнопке

        // Добавляем кнопки в слайдер
        slider.append(prevButton, nextButton);
    }

    // Индексы для управления слайдами (предыдущий, активный и следующий)
    let prevIndex = 0;
    let activeIndex = 1;
    let nextIndex = 2;
    const slides = document.querySelectorAll(`${className} .cards-list li`); // Получаем все слайды
    let bullets = null;
    if (pagination) {
        bullets = document.querySelectorAll(`${className} .bullets-list li`); // Получаем все буллеты, если есть пагинация
    }

    // Функция для обновления активных слайдов и буллетов
    function updateSlider() {
        // Сбрасываем классы 'prev', 'active', 'next' для всех слайдов
        slides.forEach((item) => item.classList.remove('prev', 'active', 'next'));
        // Если есть пагинация, сбрасываем классы для буллетов
        if (pagination) {
            bullets.forEach((item) => item.classList.remove('prev', 'active', 'next'));
        }

        // Назначаем классы для предыдущего, активного и следующего слайда
        slides[prevIndex].classList.add('prev');
        slides[activeIndex].classList.add('active');
        slides[nextIndex].classList.add('next');

        // Если есть пагинация, назначаем классы для буллетов
        if (pagination) {
            bullets[prevIndex].classList.add('prev');
            bullets[activeIndex].classList.add('active');
            bullets[nextIndex].classList.add('next');
        }
    }

    // Функции для генерации следующего и предыдущего индекса
    function generateIndex(num, length) {
        return (num + 1) % length; // Генерируем следующий индекс
    }

    function generatePrevIndex(num, length) {
        return (num - 1 + length) % length; // Генерируем предыдущий индекс
    }

    // Функция для автоматического переключения слайдов
    function renderSlider() {
        prevIndex = generateIndex(prevIndex, slides.length); // Генерируем новый индекс для предыдущего слайда
        activeIndex = generateIndex(activeIndex, slides.length); // Генерируем новый активный индекс
        nextIndex = generateIndex(nextIndex, slides.length); // Генерируем новый индекс для следующего слайда

        updateSlider(); // Обновляем слайды
    }

    // Если включена пагинация, делаем буллеты кликабельными
    if (pagination) {
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                // При клике обновляем индексы
                prevIndex = (index - 1 + slides.length) % slides.length;
                activeIndex = index;
                nextIndex = (index + 1) % slides.length;

                updateSlider(); // Обновляем слайды
            });
        });
    }

    // Если включена навигация, добавляем обработчики кликов на кнопки prev и next
    if (navigation) {
        prevButton.addEventListener('click', () => {
            prevIndex = generatePrevIndex(prevIndex, slides.length); // Генерируем новый индекс для предыдущего слайда
            activeIndex = generatePrevIndex(activeIndex, slides.length); // Генерируем новый активный индекс
            nextIndex = generatePrevIndex(nextIndex, slides.length); // Генерируем новый индекс для следующего слайда
            updateSlider(); // Обновляем слайды
        });

        nextButton.addEventListener('click', () => {
            renderSlider();  // Используем функцию для сдвига вперед
        });
    }

    // Если указана скорость (speed > 0), запускаем автоматическое переключение слайдов
    if (speed > 0) setInterval(renderSlider, speed);

    // Инициализация первой отрисовки слайдера
    updateSlider();
}

// Примеры вызова слайдера

// Слайдер с пагинацией, но без кнопок навигации
createSlider(options = { className: '.banner', height: "500px", pagination: true});

// Слайдер с кнопками навигации, но без пагинации
createSlider(options = { className: '.profile', height: "500px", navigation: true });

// Слайдер с автоматическим переключением (speed), но без навигации и пагинации
createSlider(options = { className: '.show', speed: 1500, height: "600px"});

// Вспомогательная функция для создания DOM-элементов
function createElement(tag) {
    return document.createElement(tag); // Возвращаем новый элемент
}
