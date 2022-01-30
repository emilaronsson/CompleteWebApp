boughtPlotsArray = [];
curiosityArray = [];
opportunityArray = [];
spiritArray = [];
roverArray = [];
soldImg = "../images/sold4.png";
let indexView = document.getElementById("index-view"); 
let buyPlotView = document.getElementById("buy-plot-view"); 
let contactView = document.getElementById("contact-view"); 
let myPlotView = document.getElementById("my-plot-view");
let roverView = document.getElementById("rover-view");
let singleRoverView = document.getElementById("single-rover-view");
let viewArray = [indexView, buyPlotView, contactView, myPlotView, roverView, singleRoverView];
const apiUrl = "https://localhost:44397/api/Rovers";
const curiosityUrl = "https://localhost:44397/api/Rovers/1";
const opportunityUrl = "https://localhost:44397/api/Rovers/2";
const spiritUrl = "https://localhost:44397/api/Rovers/3";

async function showRovers(data) {
    let tab =
        `<tr>
        
        <th>Name</th>
        <th>Mission</th>
    </tr>`;

    for (let r of data) {
        tab += `<tr> 
    
    <td><a type="button" onclick="logRover()">${r.name}</a></td>
    <td>${r.mission}</td>          
</tr>`;
    }
    document.getElementById("rovers").innerHTML = tab;
}
async function showRover(data) {
    let content = `<h1>${data.name}</h1>
    <h2>${data.mission}</h2>`;
    document.getElementById("rover").innerHTML = content;
}
async function getApi(url) {
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
    showRovers(data);
    showRover(data);
}
getApi(apiUrl);
getApi(curiosityUrl);
getApi(opportunityUrl);
getApi(spiritUrl);


for (let i = 0; i < viewArray.length; i++) {
    viewArray[i].setAttribute("hidden", "hidden");
}

indexView.removeAttribute("hidden", "hidden");

const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
customCreateElements = (tag, attribute, attributeName, parent) => {
    element = document.createElement(tag);
    if (attribute) {
        element.setAttribute(attribute, attributeName);
    }
    parent.appendChild(element);
    return element;
}

class Plot {
    isSold = false;
    constructor(imgSrc, plotId) {
        this.imgSrc = imgSrc;
        this.plotId = plotId;
    }

    createPicture(parent)
    {
        let picture = customCreateElements("img", "src", this.imgSrc, parent);
        picture.classList.add("d-block");
        picture.classList.add("w-100");
        if (this.isSold)
        {
            let soldElement = customCreateElements("img", "src", soldImg, parent);
            soldElement.classList.add("sold-img");
        }
        return picture;
    }

    setSold(parent) {
        let soldElement = customCreateElements("img", "src", soldImg, parent);
        soldElement.classList.add("sold-img");
        this.isSold = true;
    }

    showMyPlot(parent)
    {
        let myPlotImg = customCreateElements("img", "src", this.imgSrc, parent);
        myPlotImg.classList.add("my-plot-img");
    }
}

const photoData = async () => {
    const curiosityBtn = document.getElementById("curiosity");
    const curiosityPhotoData = await getData("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=3361&camera=NAVCAM&page=1&api_key=SndjkFVduJhT02KRPLEJtZOr252PuDF4y21IQ1aI");
    for (const photo of curiosityPhotoData.photos) {
        let newPlot = new Plot(photo.img_src, photo.id);
        curiosityArray.push(newPlot);
    }

    curiosityBtn.addEventListener("click", async () => {

        let carouselInner = document.querySelector('.carousel-inner');
        let carouselIndicator = document.querySelector('.carousel-indicators');
        carouselInner.innerHTML = "";
        carouselIndicator.innerHTML = "";

        for (let i = 0; i < curiosityArray.length; i++) {
            let button = customCreateElements("button", "type", "button", carouselIndicator);
            button.setAttribute("data-bs-target", "#carouselExampleIndicators");
            button.setAttribute("data-bs-slide-to", i);
            button.setAttribute("aria-label", "Slide " + i);

            // Bilder
            let carouselDiv = customCreateElements("div", "class", "carousel-item", carouselInner);
            curiosityArray[i].createPicture(carouselDiv);
            
            if (i === 0) {
                carouselDiv.classList.add("active");
                button.setAttribute("aria-current", "true");
                button.setAttribute("class", "active");
            }
            
            let btnDiv = customCreateElements("div", "class", "button-div", carouselDiv);
            let btnBuy = customCreateElements("button", "id", "s", btnDiv);
            btnBuy.classList.add("btn");
            btnBuy.classList.add("btn-primary");
            btnBuy.textContent = "Köp";

            btnBuy.addEventListener("click", () => {
                let test = carouselDiv;
                boughtPlotsArray.push(curiosityArray[i]);
                curiosityArray[i].setSold(test);
            });
        }
    });

    const opportunityBtn = document.getElementById("opportunity");
    const opportunityPhotoData = await getData("https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=5101&camera=PANCAM&page=1&api_key=SndjkFVduJhT02KRPLEJtZOr252PuDF4y21IQ1aI");
    
    for (const photo of opportunityPhotoData.photos) {
        let newPlot = new Plot(photo.img_src, photo.id);
        opportunityArray.push(newPlot);
    }
    
    opportunityBtn.addEventListener("click", async () => {
        let carouselInner = document.querySelector('.carousel-inner');
        let carouselIndicator = document.querySelector('.carousel-indicators');
        carouselInner.innerHTML = "";
        carouselIndicator.innerHTML = "";

        for (let i = 0; i < opportunityPhotoData.photos.length; i++) {
            let button = customCreateElements("button", "type", "button", carouselIndicator);
            button.setAttribute("data-bs-target", "#carouselExampleIndicators");
            button.setAttribute("data-bs-slide-to", i);
            button.setAttribute("aria-label", "Slide " + i);

            // Bilder
            let carouselDiv = customCreateElements("div", "class", "carousel-item", carouselInner);
            opportunityArray[i].createPicture(carouselDiv);

            if (i === 0) {
                carouselDiv.classList.add("active");
                button.setAttribute("aria-current", "true");
                button.setAttribute("class", "active");
            }

            let btnDiv = customCreateElements("div", "class", "button-div", carouselDiv);
            let btnBuy = customCreateElements("button", "id", "s", btnDiv);
            btnBuy.classList.add("btn");
            btnBuy.classList.add("btn-primary");
            btnBuy.textContent = "Köp";

            btnBuy.addEventListener("click", () => {
                let test = carouselDiv;
                boughtPlotsArray.push(opportunityArray[i]);
                opportunityArray[i].setSold(test);
            });
        }
    });
    
    const spiritBtn = document.getElementById("spirit");
    const spiritPhotoData = await getData("https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=2176&camera=PANCAM&page=1&api_key=SndjkFVduJhT02KRPLEJtZOr252PuDF4y21IQ1aI");

    for (const photo of spiritPhotoData.photos) {
        let newPlot = new Plot(photo.img_src, photo.id);
        spiritArray.push(newPlot);
    }

    spiritBtn.addEventListener("click", async () => {
        let carouselInner = document.querySelector('.carousel-inner');
        let carouselIndicator = document.querySelector('.carousel-indicators');
        carouselInner.innerHTML = "";
        carouselIndicator.innerHTML = "";

        for (let i = 0; i < spiritPhotoData.photos.length; i++) {
            let button = customCreateElements("button", "type", "button", carouselIndicator);
            button.setAttribute("data-bs-target", "#carouselExampleIndicators");
            button.setAttribute("data-bs-slide-to", i);
            button.setAttribute("aria-label", "Slide " + i);

            // Bilder
            let carouselDiv = customCreateElements("div", "class", "carousel-item", carouselInner);
            spiritArray[i].createPicture(carouselDiv);

            if (i === 0) {
                carouselDiv.classList.add("active");
                button.setAttribute("aria-current", "true");
                button.setAttribute("class", "active");
            }

            let btnDiv = customCreateElements("div", "class", "button-div", carouselDiv);
            let btnBuy = customCreateElements("button", "id", "s", btnDiv);
            btnBuy.classList.add("btn");
            btnBuy.classList.add("btn-primary");
            btnBuy.textContent = "Köp";
            
            btnBuy.addEventListener("click", () => {
                let test = carouselDiv;
                boughtPlotsArray.push(spiritArray[i]);
                spiritArray[i].setSold(test);
            });
        }
    });
}

photoData();

function myPlots() {
    for (const view of viewArray) {
        view.setAttribute("hidden", "hidden");
    }
    myPlotView.removeAttribute("hidden", "hidden");
    myPlotView.innerHTML = "";
    let header = customCreateElements("h1", "", "", myPlotView);
    header.textContent = "Mina Tomter";
    for (const plot of boughtPlotsArray) {
        plot.showMyPlot(myPlotView);
    }
}

function contact() {
    for (const view of viewArray) {
        view.setAttribute("hidden", "hidden");
    }
    contactView.removeAttribute("hidden", "hidden");
}

function index() {
    for (const view of viewArray) {
        view.setAttribute("hidden", "hidden");
    }
    indexView.removeAttribute("hidden", "hidden");
}

function buyPlots() {
    for (const view of viewArray) {
        view.setAttribute("hidden", "hidden");
    }
    buyPlotView.removeAttribute("hidden", "hidden");
}

function logRovers() {
    for (const view of viewArray) {
        view.setAttribute("hidden", "hidden");
    }
    roverView.removeAttribute("hidden", "hidden");
}

function logRover() {
    
    showRover();
    for (const view of viewArray) {
        view.setAttribute("hidden", "hidden");
    }
    singleRoverView.removeAttribute("hidden", "hidden");
}
