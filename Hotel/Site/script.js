const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('#slider .buttons .left');
const rightBtn = document.querySelector('#slider .buttons .right');
const hotel_inputs = document.querySelectorAll(".hotel-item");
const hotel_list = document.querySelectorAll(".sl-title li");

let activeSlide = 0;

// On load - Select slider's first title
document.addEventListener("DOMContentLoaded", function(event) {
    var selectFirst = document.querySelector('.sl-title li:first-child');
        selectFirst.classList.add('active');
});

// Right Button
rightBtn.addEventListener('click',()=> {
    activeSlide++;

    if (activeSlide > slides.length - 1) {
        activeSlide = 0;
    }

    setActiveSlide();
});

// Left Button
leftBtn.addEventListener('click',()=> {
    activeSlide--;

    if (activeSlide < 0) {
        activeSlide = slides.length - 1; 
    }

    setActiveSlide();
});

// Set Active Slide
function setActiveSlide() {
    slides.forEach(slide => slide.classList.remove('active'));

    slides[activeSlide].classList.add('active');

    Object.keys(slides).forEach(key => {
        if (key == activeSlide) {
            document.querySelectorAll('[name="'+ slides[key].getAttribute("id") +'"]')[0].click();
        }
    });

    document.querySelector('.sl-numbers > span').innerHTML = '0' + (activeSlide + 1);
}

// Hotel Selection from Slider
$('.hotel-item').on('change', function() {
    $('.hotel-item').not(this).prop('checked', false);  
});

hotel_inputs.forEach(hotel => {
    hotel.addEventListener('click',()=> {
        var i = 0;
        var input_name = hotel.getAttribute("name");

        slides.forEach(slide => { 
            i++;
            slide.classList.remove("active");
            if (slide.getAttribute("id") == input_name) {
                slide.classList.add("active");
                document.querySelector(".sl-numbers > span").innerHTML = '0' + i;
                activeSlide = i - 1;
            }
        });

        hotel_list.forEach(li => {
            li.classList.remove("active");
        });
        hotel.parentElement.classList.toggle("active");
    });    
});

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', fixedHeader);

function fixedHeader() {
    if (window.scrollY > header.offsetHeight -100) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
}

// Mobile Menu
const toggle = document.querySelector('#mobile-menu-icon .toggle');
const hamIcon = document.querySelector('.hamburger-icon');
const mobileMenu = document.querySelector('#main-menu-wrapper.mobile-menu');

function hamMenu() {
    if (toggle.checked) {
        hamIcon.classList.add('close-btn');
        mobileMenu.style = 'opacity: 1;  visibility: visible; transition: all 0.5s ease';
        hamIcon.style = 'background: var(--dark-gray)';
        document.querySelector('#language-menu a').style = 'background: var(--dark-gray)';
    } else {
        hamIcon.classList.remove('close-btn');
        mobileMenu.style = 'opacity: 0; visibility: hidden; transition: all 0.5s ease';
        hamIcon.style = 'background: var(--dark-font)';
        document.querySelector('#language-menu a').style = 'background: var(--dark-font)';
    }
}

// Make Guests List
const maxGuests = 7;
const guestList = document.querySelector('.guests-select');
const guestInput = document.querySelector('.guests.calendar-input');

guestInput.addEventListener('click', () => guestList.classList.toggle('show-guests'));

for(let i = 1; i < maxGuests; i++) {
    guestList.innerHTML += `<li id="ul-${i}">${i}</li>`;
}

// Working Guest List
const guests = document.querySelectorAll('.guests-select li');

guests.forEach(guest => {
    guest.addEventListener('click', () => {
        document.querySelector('.guests .guest-no').innerHTML = guest.innerHTML;
        guestList.classList.toggle('show-guests');
    })
})

function guestsClick() {
    document.querySelector('.guests').addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', (e) => {
        if ((e.target).matches('.guests') === false)  {
            guestList.classList.remove('show-guests');
        }
    })
}

guestsClick();
