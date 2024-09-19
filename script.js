


function createSlider(className, speed) {
    const slider = document.querySelector(className);
    const sliderCards = document.querySelectorAll(`${className} >*`);


    // slider

    const sliderCardsList = createElement('ul');
    sliderCardsList.classList.add('cards-list');
    const sliderBulletList = createElement('ul');
    sliderBulletList.classList.add('bullets-list');


    sliderCards.forEach((item, i) => {
        const slide = createElement('li');
        slide.classList.add('slide');
        slide.append(item)
        sliderCardsList.appendChild(slide)

        const bullet = createElement('li');
        bullet.classList.add('bullet');
        const button = createElement('button');
        button.classList.add('button');
        button.innerText = i

        bullet.append(button)
        sliderBulletList.appendChild(bullet)

    })

    slider.append(sliderCardsList, sliderBulletList);

    

    // bullets

    let prevIendex = 0;
    let activeIndex = 1;
    let nextIndex = 2;
    const slides = document.querySelectorAll(`${className} .cards-list li`);   
    const bullets = document.querySelectorAll(`${className} .bullets-list li`);   

    slides[prevIendex].classList.add('prev')
    slides[activeIndex].classList.add('active')
    slides[nextIndex].classList.add('prev')
    bullets[prevIendex].classList.add('prev')
    bullets[activeIndex].classList.add('active')
    bullets[nextIndex].classList.add('prev')
    
    function renderSlider(){
        prevIendex = generateIndex(prevIendex, slides.length - 1);
        activeIndex = generateIndex(activeIndex, slides.length - 1);
        nextIndex = generateIndex(nextIndex, slides.length - 1);

        for(let item of slides){
            item.classList.remove('prev' , 'active' , 'next')
        }
        for(let item of bullets){
            item.classList.remove('prev' , 'active' , 'next')
        }

        slides[prevIendex].classList.add('prev')
        slides[activeIndex].classList.add('active')
        slides[nextIndex].classList.add('next')
        bullets[prevIendex].classList.add('prev')
        bullets[activeIndex].classList.add('active')
        bullets[nextIndex].classList.add('next')
    }

    if(speed)setInterval(renderSlider, speed)

}





createSlider('.banner' , 1000)
createSlider('.profile' , 2000)
createSlider('.show')


// helpers
function createElement(tag) {
    return document.createElement(tag)
}

function generateIndex(num, limit) {
    num++;
    if (num > limit) num = 0;
    return num
}