// variable
const phoneContainer = document.getElementById('phones-container');
const searchField = document.getElementById('search-field');
const showAll = document.getElementById('show-all');
const loader = document.getElementById('loader');


// loadPhones data

const loadPhoneData = async (searchText, isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    const phones = data.data;
    displayPhonesData(phones, isShowAll)
}

// displayPhonesData

const displayPhonesData = (phones, isShowAll) => {
    phoneContainer.textContent = '';

    //display show all button if there are more then 12 phones
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove("d-none");
    } else {
        showAll.classList.add("d-none");
    }

    //display only first 12 phones
    // phones = phones.slice(0, 12);

    //display only first 12 phones if not show all

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        const singlePhoneDiv = document.createElement('div');
        singlePhoneDiv.innerHTML = `
           <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

            </div>
        </div>
        `
        phoneContainer.appendChild(singlePhoneDiv);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// loadPhoneDetails
const loadPhoneDetails = async (id) => {
    // console.log("object", id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phonesId = data.data;
    showPhoneDetails(phonesId);
}

const showPhoneDetails = (phone, phonesId) => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    console.log("phones id:", phonesId);
    const ulDiv = document.getElementById('ul-div');
    const innerli = document.createElement('li');
    ulDiv.appendChild(innerli);
    console.log(phone);
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}</p>
    <p> Id: ${phone.slug ? phone.slug : "No Slug Date Found"}</p>
    <p> chipSet: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : "No chipSet Found"}</p>



    `
}

// search button for searching phone data

const handleSearch = (isShowAll) => {

    const searchText = searchField.value;
    toggleLoadingSpinner(true)
    loadPhoneData(searchText, isShowAll)
}
// loader spiner
const toggleLoadingSpinner = (isloading) => {
    if (isloading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

// handle show showAll

const handleShowAll = () => {
    handleSearch(true)
}

// loadPhoneData()