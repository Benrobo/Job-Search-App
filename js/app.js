function log(n){
    return console.log(n)
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
        log("Theme" + theme)
        if(theme == "dark.css"){
            icon.setAttribute("name", newname)
            swapStyle("style.css")
        }else if(theme == "style.css"){
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

