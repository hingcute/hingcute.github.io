//Lê Văn Đông B1910365 
const buttonOpen = document.querySelector(".header__bars")
const pageHeader = document.querySelector(".page__header")

function addClassHeader() {
    console.log('onclick')
    pageHeader.classList.add("active")
}

function removeClassHeader() {
    pageHeader.classList.remove("active")
}
// JS slider
// https://www.w3schools.com/howto/howto_js_slideshow.asp
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000);
}
//Button//
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function sendDatapc() {
    if (document.querySelector("#header-form--pc input ").value.length > 0) {
        document.querySelector("#header-form--pc").submit();

    } else {
        alert("Vui lòng nhập nội dung cần tìm kiếm!");

    }
    return false;
}

function sendDatamb() {
    if (document.querySelector("#header-form--mobile input ").value.length > 0) {
        document.querySelector("#header-form--mobile").submit();

    } else {
        alert("Vui lòng nhập nội dung cần tìm kiếm!");

    }
    return false;
}


const prices = document.querySelectorAll('.price');
prices.forEach(item => {
    item.innerText = Number(item.innerText).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'VND'
    });
});

window.addEventListener('load', loadShopingCart, false);
/*window.onload = loadShopingCart; */