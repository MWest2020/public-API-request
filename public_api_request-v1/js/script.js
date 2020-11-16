
let url = 'https://randomuser.me/api/?results=12';
let employees = 12;
createSearch();
// createModal();

fetch(url)
    .then(res => res.json())
    .then(data => getData(data, employees))
    


const fetchData = [];

function getData(data, num){
    for(let i = 0 ; i < num; i++){
         
        dataResults = data.results[i];
        let dataObj = new Object();
        
        dataObj.thumbnail = dataResults.picture.large,
        dataObj.firstName = dataResults.name.first,
        dataObj.lastName = dataResults.name.last,
        dataObj.birthday = dataResults.dob.date, 
        dataObj.phone = dataResults.cell,
        dataObj.email = dataResults.email,
        dataObj.streetNum = dataResults.location.street.number,
        dataObj.streetName = dataResults.location.street.name,
        dataObj.postcode =dataResults.postcode,
        dataObj.city = dataResults.location.city,
        dataObj.state = dataResults.location.state
        
    fetchData.push(dataObj);
    }   
    generateHTML(employees);
}



function generateHTML(num){
    for(let i = 0 ; i < num; i++){
            const gallery = document.querySelector('#gallery');
            const card = document.createElement('div');
            card.className = 'card'; 
            
        card.innerHTML = `
            <div class="card-img-container">
                    <img class="card-img" src=${fetchData[i].thumbnail} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${fetchData[i].firstName} ${fetchData[i].lastName}</h3>
                    <p class="card-text">${fetchData[i].email}</p>
                    <p class="card-text cap">${fetchData[i].city},  ${fetchData[i].state}</p>
                </div>
            `;
        gallery.appendChild(card);
        
    }

        
    }


function createSearch(){
        const searchContainer = document.querySelector('.search-container');
        const searchForm = document.createElement('form');
        
        Object.assign(searchForm, {
            action: '#',
            method : 'get'
        })
        
        searchContainer.appendChild(searchForm); 

        const searchInput = document.createElement('input');
            Object.assign(searchInput, {
                type: 'search',
                id : 'search-input',
                class: 'search-input',
                placeholder: 'Search...'
            })

        searchForm.appendChild(searchInput);  
        
        const searchSubmit = document.createElement('input');
            Object.assign(searchSubmit, {
                type: 'submit',
                value: '&#x1F50D;',
                id : 'search-submit',
                class: 'search-submit',
            })
        searchForm.appendChild(searchSubmit);
    }

//Stack overflow https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript/8358141
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
    }

function createModal(){

        const gallery = document.querySelector('#gallery');
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';

       
        // const formatPhone = formatPhoneNumber(phone);
        
           

            

        modalContainer.innerHTML = `
        <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${thumbnail} alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${formatPhone}</p>
                        <p class="modal-text">${streetNum} ${streetName}, ${state}, ${postcode}</p>
                        <p class="modal-text">Birthday: ${birthday}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
                `;


        gallery.after(modalContainer);
    }