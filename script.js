function type()
{
    let name1="PARTH SHARMA";
    let namearr=name1.split("");

    function looping()
    {
        if(namearr.length>0)
        {
            let n=namearr.shift();
            document.querySelector("#heading--main").innerHTML+=n;
        }   
        else
        {
            //deleting();
            return false;
        }
        setTimeout(looping,500);
    }

    looping();
}


function deleting()
{
    nameDarr=document.querySelector("#heading--main").innerHTML.split("");
    if(nameDarr.length>0)
    {
        nameDarr.pop();
        document.querySelector("#heading--main").innerHTML=nameDarr.join("");
    }
    else
    {
        type();
        return false;
    }
    setTimeout(deleting,150)
}

type();


//skills fill effect 


const square = document.querySelectorAll('.skill-line div');
// square.forEach(a=>a.classList.remove('animaaation'));


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animaaation');
      return;
    }

    entry.target.classList.remove('animaaation');
  });
});

square.forEach(a=>observer.observe(a))




//light dark theme 
let dayN=document.querySelector("#day-night")
dayN.addEventListener("click",alter)
function alter()
{
    if(dayN.querySelector("i").classList.contains("fa-sun"))
    {
        dayN.innerHTML='<i class="fas fa-moon"></i>';
        document.querySelector("body").classList.add("dark");
        document.querySelector("body").classList.remove("light");
    }
    else
    {
        dayN.innerHTML='<i class="fas fa-sun"></i>';
        document.querySelector("body").classList.remove("dark");
        document.querySelector("body").classList.add("light");
    }
}


//cursor
const cursor=document.querySelector(".cursor");
document.addEventListener('mousemove',e=>{
    cursor.setAttribute("style","top: "+(e.pageY-20)+"px;left: "+(e.pageX-20)+"px");
})

let element = document.querySelectorAll("button,a");

element.forEach(a=>a.addEventListener("mouseover", function( event ) {
    cursor.classList.add("red");
},));

element.forEach(a=>a.addEventListener("mouseout", function( event ) {
    cursor.classList.remove("red");
},));

