
let sections = document.querySelectorAll("section");
let sectionHeight = sections[0].offsetHeight;
let headerHeight = document.querySelector("header").offsetHeight;
let dots = document.querySelectorAll('.dot');

let scroll = document.querySelector('.scroll');

///////  FOR PARALLAX AND NAV-DOTS


let num = (window.scrollY - headerHeight) /sectionHeight;
num = Math.round(num);
num = Math.abs(num);
dots[num].style.background = "green";

document.querySelector('.nav-dots').addEventListener('click',function(event){
    if(event.target.classList.value == "dot"){
        clearDots();
        event.target.style.background = "green";
        let z = extractNumber(event.target.id);
        if(z == 0 ){
            window.scrollTo(0,0);
        } else {
            window.scrollTo(0,sections[z].offsetTop);
        }
    } 
    if(event.target.classList.value == "dot-container"){
        clearDots();
        event.target.children[0].style.background = "green";
        let z = extractNumber(event.target.children[0].id);
        if(z == 0 ){
            window.scrollTo(0,0);
        } else {
            window.scrollTo(0,sections[z].offsetTop);
        }
    }
});

function clearDots(){
    dots.forEach(function(dot){
        dot.style.background = "rgb(175, 175, 214)";
    });
}
function extractNumber(x){
    let number;
    if(x[4] != undefined){
        number = x[3]*10 + x[4]*1;
    } else{
        number = x[3]*1;
    }
    return number-1;
}


document.addEventListener("scroll", function(){
    scroll.innerHTML = window.scrollY;
    let num = (window.scrollY - headerHeight) /sectionHeight;
    num = Math.round(num);
    num = Math.abs(num);

    if(num != 11){
        clearDots();
        dots[num].style.background = "green";
    }

    if(num >= 0){
        parallax(num);
        if(num-1 >= 0){
            parallax(num-1);
        }
    }
})

let parallax = (index)=>{
    if(index == 11){
        return;
    }
    let scrollValue;
    if(index == 0){
        scrollValue = window.scrollY - sections[index].offsetTop + headerHeight;
    } else {
        scrollValue = window.scrollY - sections[index].offsetTop + window.innerHeight;
    }


    let bg_parallaxValue = scrollValue/7;
    let fg_parallaxValue = scrollValue/2.6;
    
    let child = sections[index].children;
    let grandChild = child[0].children;
    grandChild[0].style.top = "-"+bg_parallaxValue+"px";

    if(index == 1 || index == 5 || index == 9){
        grandChild[1].style.bottom = fg_parallaxValue+"px";

    }
}

