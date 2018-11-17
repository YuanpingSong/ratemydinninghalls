const dinningHalls = ['Bruin Plate', 'Covel', 'De Neve', 'Feast'];
const dinningRestaurants = ['Bruin Cafe', 'Cafe 1919', 'Rondezvous', 'De Neve Grab and Go', 'The Study at Hedrick'];

const flex_container = document.querySelector('.flex-container');
const num_phantoms = 10; // set to maximum number of flex items we expect on a row - 1

const context_halls = 0;
const context_restaurants = 1;
const context_all = 2;
let flex_container_context = context_halls; // set initial content here

function init_flex_container(context) {
    if (context == context_all || context == context_halls) {
        for (hall of dinningHalls) {
            let item_box = document.createElement('div');
            item_box.className = 'flex-item';
            item_box.innerHTML = hall;
            flex_container.appendChild(item_box);
        } 
    } 
    if (context == context_all || context == context_restaurants) {
        for (restaurant of dinningRestaurants) {
            let item_box = document.createElement('div');
            item_box.className = 'flex-item';
            item_box.innerHTML = restaurant;
            flex_container.appendChild(item_box);
        }
    }
    for (let i = 0; i < num_phantoms; i++) {
        let phantom_elt = document.createElement('div');
        phantom_elt.className = 'phantom-element';
        flex_container.appendChild(phantom_elt);
    }
}

function flex_container_context_switch(new_context) {
    while(flex_container.firstChild) {
        flex_container.removeChild(flex_container.firstChild);
    }
    init_flex_container(new_context);
}

function halls_button_on_click() {
    flex_container_context = context_halls;
    flex_container_context_switch(flex_container_context);
}
function restaurants_button_on_click() {
    flex_container_context = context_restaurants;
    flex_container_context_switch(flex_container_context);
}
function all_button_on_click() {
    flex_container_context = context_all;
    flex_container_context_switch(flex_container_context);
}


/*function context_button_on_click() {
    switch (flex_container_context) {
        case context_halls:
            context_button.innerHTML = 'Restaurants';
            break;
        case context_halls:
            context_button.innerHTML = 'All';
            break;
        case context_halls:
            context_button.innerHTML = 'Halls';
            break;
    }
    flex_container_context = (flex_container_context + 1) % 3;
    flex_container_context_switch(flex_container_context);
}*/

init_flex_container(flex_container_context);


