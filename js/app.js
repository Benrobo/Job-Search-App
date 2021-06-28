function log(n){
    return console.log(n)
}


function animateTyping(){
    let h2 = document.querySelector(".h2")
    let h3 = document.querySelector(".h3")
    // Get The Jobs Of Your Life
    // Header h2, and h3
    new TypeIt(h2, {
        speed: 50,
        waitUntilVisible: true
      })
        .type("Gtt", {delay: 300})
        .move(-1)
        .delete(1)
        .type('e')
        .move('END')
        .type(' Remoe')
        .pause(300)
        .move(-1)
        .type("t")
        .pause(500)
        .move("END")
        .type(' Jobs Herr')
        .move(0)
        .delete(1)
        .type("e")
        .pause(500)
        .go();

    // H3
    new TypeIt(h3, {
        speed: 50,
        waitUntilVisible: true
      })
        .type("1500", {delay: 300})
        .move(-0)
        .pause(800)
        .delete(3)
        .type('5')
        .move('END')
        .type(' Jos')
        .pause(300)
        .move(-2)
        .type("b")
        .pause(500)
        .move("END")
        .type(' Founed.')
        .move(-0)
        .pause(500)
        .delete(2)
        .type("d")
        .pause(500)
        .go();
    // input form element
    new TypeIt(".search-inp", {
        strings: "Search Your Field",
        waitUntilVisible: true
    }).go();
}

function toggleExpand(){
    let panel = document.querySelectorAll(".panel")
    for(var i=0; i<panel.length; i++){
        panel[i].onclick = function(e){
            var expand = this.nextElementSibling;
            
            expand.classList.toggle("active")
        }
    }
}



async function fetchJobs(){
    let url = "js/data.json"
    let res = await fetch(url)
    let data = await res.json()

    
    getJobs(data)
    animateTyping()
}
fetchJobs()


function getJobs(data){
    data.forEach((e)=>{
        // log(e)
        let {company, logo, roleName, postedTime, type, location, applicationLink, requirements} = e

        appendJobs(company, logo, roleName, postedTime, type,location, applicationLink, requirements)

    })
}


function appendJobs(company, logo, roleName, postedTime, type, location, applicationLink, requirements){
    let boxes = document.querySelector(".boxes")
    let txt = ""
    let items = requirements["items"].forEach((e)=>{
        return txt+=e
    })
    
    // log(requirements)
    boxes.innerHTML += `
        <div class="box">
            <div class="panel">
            <div class="logo">
                <img src="${logo}" alt="" class="job-logo">
            </div>
            <div class="body ml-4">
                <div class="txt">
                <h5 class="head">${company}</h5>
                <h6>${roleName}</h6>
                </div>
            </div>
            <div class="job-tag ml-2">
                <button class="btn btn-grey">${type}</button>
            </div>
            <span class="time">
                <ion-icon name="alarm-outline" class="icon"></ion-icon>
                <b>${postedTime}</b>
            </span>
            <div class="btns-cont">
                <a href="${applicationLink}" 
                target="_blank" class="redir">
                <button class="btn redir-btn">
                    Apply
                </button>
                </a>
            </div>
            </div>
            <!-- main text -->
            <div class="expand">
            <div class="main">
                <div class="body">
                <h5>${roleName}</h5>
                <span>${location}</span>
                </br>
                <p>
                    ${requirements["intro"]}
                </p>
                <p>
                    ${requirements["content"]}
                </p>

                <ul>
                    <li>${txt}</li>
                </ul>

                </div>
                <a href="${applicationLink}" 
            target="_blank" class="redir">
                <button class="btn redir-btn">
                    Apply
                </button>
            </a>
            </div>
            </div>
        </div>

    `;

    toggleExpand()
}


function darkMode(){
    let icon = document.querySelector(".dmode")
    
    let newname = "contrast-outline"

    icon.onclick = (e)=>{

        let theme = localStorage.getItem("theme")
        if(theme == null){
            icon.setAttribute("name", newname)
            swapStyle("light.css")
        }
        else{
            swapStyle("dark.css")
            icon.setAttribute("name", "sunny-outline")
        }
    }


    function swapStyle(sheet){
        document.querySelector(".theme").href = "css/" + sheet
        localStorage.setItem("theme", sheet)
    }
}
darkMode()

