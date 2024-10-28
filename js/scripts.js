const loadPhone = async (searchField, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    // Show All buttons Display
    const showAllPhones = document.getElementById('show-all-phones');

    if(phones.length > 9 && !isShowAll){
        showAllPhones.classList.remove('hidden');
    }
    else{
        showAllPhones.classList.add('hidden');
    }

    // console.log('Is show All ', isShowAll)
    // display Only 9 Phones
    if(!isShowAll){
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
                <button onclick="showDetails('${phone.phone_name}')" class="btn btn-primary w-full">Show All Details</button>
             </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        loadingSpinner(false);

    });
};

const showDetails = (id) =>{
    console.log('Clicked', id)
}

const searchResult = (isShowAll) =>{
    loadingSpinner(true);
    const searchField = document.getElementById('search-field').value;
    // console.log(searchField);
    loadPhone(searchField, isShowAll);
};


const loadingSpinner = (isLoading) => {
    const loadingSpinnerBox = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinnerBox.classList.remove('hidden');
    }
    else{
        loadingSpinnerBox.classList.add('hidden');
    }
};

const showAllButton = () =>{
    searchResult(true)
}


// loadPhone();