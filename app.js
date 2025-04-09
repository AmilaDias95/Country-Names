let countriesArrayList = [];

function loadCountries() {
    let countriesList = document.getElementById("countriesList");

    let body = "";

    fetch("./countries.json")
        .then(res => res.json())
        .then(dataList => {
            countriesArrayList = dataList;
            loadModalData();
            dataList.forEach((element, index) => {

                body += `
                               <div class="col" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
                        <div class="card shadow-sm">
                            <img src="${element.flags.png}" alt="">
                            <div class="card-body">
                            <h4>${element.name.common}</h4>
                                <p class="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                       <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">View More-></button>
                                    </div>
                                    <small class="text-body-secondary">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                        <!-- Modal -->
            `
            });

            countriesList.innerHTML = body;
        })
}


async function loadModalData(index) {
    let modalBody = document.getElementById("modal-body");
    console.log(countriesArrayList[index]);

    modalBody.innerHTML = `
    
  
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <img src="${countriesArrayList[index].flags.png}" alt="">
    <h5 class="card-title">${countriesArrayList[index].name.official}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    `
}


function search() {
    let searchTxt = document.getElementById("txtSearch").value;
    console.log(searchTxt);
    fetch(`https://restcountries.com/v3.1/name/${searchTxt}`).then(res => res.json())
        .then(data => {
            if (data.message == "Not Found") {
                let modelTitle = document.getElementById("staticBackdropLabel");
                modelTitle.innerHTML = "No any search result";
                let modelBody = document.getElementById("model-search");
                modelBody.innerHTML = ``;
            } else {
                let modelTitle = document.getElementById("staticBackdropLabel");
                modelTitle.innerHTML = `${data[0].name.common}`;
                let modelBody = document.getElementById("model-search");
                modelBody.innerHTML = `
            <div class="card" style="width: 29rem;">
                <img src="${data[0].flags.png}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${data[0].name.common} Flag</h5>
                      <p class="card-text">${data[0].flags.alt}</p>
                    </div>
                         <ul class="list-group list-group-flush">
                              <li class="list-group-item">Official Name :${data[0].name.common} </li>
                              <li class="list-group-item">Capital : ${data[0].capital[0]}</li>
                              <li class="list-group-item">Google map : <a href="${data[0].maps.googleMaps}">View Map</a></li>
                     </ul>
                         
                </div>
    `
            }
        })
}

loadCountries();