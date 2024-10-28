const loadPhone = async (searchField = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`);
    const data = await res.json();

    displayPhones(data.data, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    // Show All buttons Display
    const showAllPhones = document.getElementById('show-all-phones');

    if (phones.length > 9 && !isShowAll) {
        showAllPhones.classList.remove('hidden');
    }
    else {
        showAllPhones.classList.add('hidden');
    }

    // console.log('Is show All ', isShowAll)
    // display Only 9 Phones
    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }



    phones.forEach(phone => {
        // console.log(phone.slug)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="py-5 bg-slate-500">
        <img src=${phone.image} />
        </figure>
        <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
             <p>${phone.brand}</p>
            
             <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary w-full">Show All Details</button>
             </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        loadingSpinner(false);

    });
};

const showDetails = async (id) => {
    // console.log('Clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;

    showPhoneDetails(phone);

};

const showPhoneDetails = (phone) => {
    // loadingSpinner(true);
    // console.log(phone)
    // const phoneNameDetails = document.getElementById('phone-name-details');
    // phoneNameDetails.innerText = phone.name;

    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML = `
        <img class="w-40 mx-auto" src=${phone.image} alt="">
        <h3 class="text-lg font-bold">${phone.name}</h3>
        <p class="text-lg my-1"><span class="font-bold">Storage : </span> ${phone?.mainFeatures?.storage}</p>
        <p class="text-lg my-1"><span class="font-bold">Display Size : </span> ${phone?.mainFeatures?.displaySize}</p>
        <p class="text-lg my-1"><span class="font-bold">Chipset : </span> ${phone?.mainFeatures?.chipSet}</p>
        <p class="text-lg my-1"><span class="font-bold">Memory  : </span> ${phone?.mainFeatures?.memory}</p>
        <p class="text-lg my-1"><span class="font-bold">Release Data : </span> ${phone?.releaseDate || 'Not Available'}</p>
        <p class="text-lg my-1"><span class="font-bold">GPS : </span> ${phone?.others?.GPS || 'No GPS'}</p>
        `;
        
        // <p class="text-lg my-1"><span class="font-bold">Slug : </span> ${phone.slug}</p>

    show_all_modal.showModal(phone)
};


const searchResult = (isShowAll) => {
    loadingSpinner(true);
    const searchField = document.getElementById('search-field').value;
    // console.log(searchField);
    loadPhone(searchField, isShowAll);
};


const loadingSpinner = (isLoading) => {
    const loadingSpinnerBox = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinnerBox.classList.remove('hidden');
    }
    else {
        loadingSpinnerBox.classList.add('hidden');
    }
};

const showAllButton = () => {
    searchResult(true)
}

loadPhone();