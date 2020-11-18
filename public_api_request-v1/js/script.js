let employees = 12;
let url = `https://randomuser.me/api/?results=${employees}&nat=US`;
let fetchData = [];
const gallery = document.querySelector('#gallery');
 




createSearch();
// createModal();

fetch(url)
    .then(res => res.json())
    .then(data => getData(data, employees))
    

function getData(data, num){
    for(let i = 0 ; i < num; i++){
         
        dataResults = data.results[i];
        let dataObj = new Object();
        
        dataObj.thumbnail = dataResults.picture.large,
        dataObj.firstName = dataResults.name.first,
        dataObj.lastName = dataResults.name.last,
        dataObj.birthday = formatBirthday(dataResults.dob.date), 
        dataObj.phone = formatPhoneNumber(dataResults.cell),
        dataObj.email = dataResults.email,
        dataObj.streetNum = dataResults.location.street.number,
        dataObj.streetName = dataResults.location.street.name,
        dataObj.postcode = dataResults.location.postcode,
        dataObj.city = dataResults.location.city,
        dataObj.state = dataResults.location.state
        
    fetchData.push(dataObj);
    }   
    generateHTML(employees, fetchData);
    // loopCards();
}

function generateHTML(num, array){
    gallery.innerHTML = ' '; 
    for(let i = 0 ; i < num; i++){
          
            const card = document.createElement('div');
            card.className = 'card'; 
            card.setAttribute('card-index', `${parseInt(i)}`)
            gallery.appendChild(card);
           
        card.innerHTML = `
            
                <div class="card-img-container">
                        <img class="card-img" src=${array[i].thumbnail} alt="profile picture">
                </div>
                <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${array[i].firstName} ${array[i].lastName}</h3>
                        <p class="card-text">${array[i].email}</p>
                        <p class="card-text cap">${array[i].city},  ${array[i].state}</p>
                </div>
            </div>
            `;
        }
        
}


document.querySelector('.gallery').addEventListener('click', (e) => {
    if (e.target !== gallery) {
        const card = e.target.closest('.card');
        
        const cardIndex = card.getAttribute('card-index');
        
        createModal(cardIndex)
    }
})


//Stack overflow https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript/8358141
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
    }

function formatBirthday(birthdayString) {
    const cleaned = ('' + birthdayString).replace(/\D/g, '');
    
    const str_cleaned = cleaned.toString();
    
    const dob = str_cleaned.slice(0,8);
   
    var year = Number(dob.substr(0, 4));
    var month = Number(dob.substr(4, 2));
    var day = Number(dob.substr(6, 2));
    
    const birthday = `${month}/${day}/${year}`;
    return birthday; 
}
   


function createModal(num){

        
        const modalContainer = document.createElement('div');
        

        const modal = fetchData[num]; 
        const index = num;
        console.log(index);   
        
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = `
        <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${modal.thumbnail} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${modal.firstName} ${modal.lastName}</h3>
                        <p class="modal-text">${modal.email}</p>
                        <p class="modal-text cap">${modal.city}</p>
                        <hr>
                        <p class="modal-text">${modal.phone}</p>
                        <p class="modal-text">${modal.streetNum} ${modal.streetName}, ${modal.state}, ${modal.postcode}</p>
                        <p class="modal-text">Birthday: ${modal.birthday}</p>
                    </div>
                </div>
                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
                `;

        
        gallery.after(modalContainer);
        document.getElementById('modal-close-btn').addEventListener('click', () => modalContainer.remove() );
        
        document.querySelector('.modal-prev').addEventListener('click', () => {
            modalContainer.remove();
            createModal(index - 1);
        });
        document.querySelector('.modal-next').addEventListener('click', () => {
            if(index == 0){
                modalContainer.remove();
                createModal(1);
            }
            else{modalContainer.remove();
            createModal(index + 1);
            }
        });
        if(index == 0){document.querySelector('.modal-prev').style.display = 'none';}
        if(index == 11){document.querySelector('.modal-next').style.display = 'none';}
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
    searchSubmit.addEventListener('click', (e) => { search()});
    searchInput.addEventListener('keyup', (e) => { search()}); 
}


function search() {
   
    const searchString = document.getElementById('search-input').value.toUpperCase();
    
    let filteredList = [];
    
        if(!searchString.length == 0){
            
            for (let i = 0; i < fetchData.length; i ++) {
                const firstName = fetchData[i].firstName.toUpperCase().includes(searchString);
                const lastName = fetchData[i].lastName.toUpperCase().includes(searchString); 
                
                if (firstName || lastName ) {
                filteredList.push(fetchData[i]);
                console.log(filteredList);
                generateHTML(filteredList.length, filteredList);
                } else if(filteredList.length === 0){
                    gallery.innerHTML = 'no results found.'
                }
            }  
        
        } else {generateHTML(employees, fetchData)}
        
    }