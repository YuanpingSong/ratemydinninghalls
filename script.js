const dinningHalls = ['Bruin Plate', 'Covel', 'De Neve', 'Feast'];
const dinningRestaurants = ['Bruin Cafe', 'Cafe 1919', 'Rondezvous', 'De Neve Grab and Go', 'The Study at Hedrick'];

const flex_container = document.querySelector('.flex-container');
const num_phantoms = 10; // set to maximum number of flex items we expect on a row - 1

const context_halls = 0;
const context_restaurants = 1;
const context_all = 2;
const activity_level = {
    'Bruin Plate' : 18, 
    'Covel': 25, 
    'De Neve': 55, 
    'Feast': 72,
    'Bruin Cafe': 15, 
    'Cafe 1919': 34, 
    'Rondezvous': 26,
    'De Neve Grab and Go': 81, 
    'The Study at Hedrick': 12
};
let flex_container_context = context_halls; // set initial content here


function init_flex_container(context) {
    if (context == context_all || context == context_halls) {
        for (hall of dinningHalls) {
            flex_container.appendChild(item_box(hall));
        } 
    } 
    if (context == context_all || context == context_restaurants) {
        for (restaurant of dinningRestaurants) {
            flex_container.appendChild(item_box(restaurant));
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

function create_percentage_bar(percentage) {
    bar_frame = document.createElement('div');
    bar_filler = document.createElement('div');
    bar_frame.className = 'bar-frame';
    bar_filler.className = 'bar-filler';
    bar_frame.appendChild(bar_filler);
    bar_filler.style.width = percentage.toString() + '%';
    bar_filler.innerHTML = percentage.toString();
    return bar_frame;
}

function hours_message(name) { // this function is not fully correct
    var d = new Date();
    if (d.getDay() != 0 && d.getDay() != 6) { // weekend
        if (d.getHours() < 14) {
            return 'Brunch 10:00 am - 2:00 pm';
        } else {
            return 'Dinner 5:00 pm - 8:00 pm';
        }
    } else {
        if (d.getHours() < 10) {
            return 'Breakfast 7:00 am - 10:00 am';
        } else if (d.getHours() < 14) {
            return 'Lunch 11:00 am - 12:00 pm';
        } else {
            return 'Dinner 5:00 pm - 8:00 pm'
        }
    }
}

function traffic_message(name) {
    dice = Math.floor(Math.random() * 3);
    if (dice == 0) {
        return 'regular traffic';
    }  else if (dice == 1) {
        return 'lighter traffic';
    } else {
        return 'heavier traffic';
    }
}

function rating(name) {
    todays_rating = 2+ Math.random() * 3;
    historical_rating = 2 + Math.random() * 3;
    return todays_rating.toFixed(2).toString() + '/' + historical_rating.toFixed(2).toString();
}

function upvotes(name) {
    return  '🔥 ' + (30 + Math.random() * 100).toFixed(0); 
}
function item_box(name) {
    let item_box = document.createElement('div');
    item_box.className = 'flex-item';
    item_box.id = name;
    item_name = document.createElement('p');
    item_name.innerHTML = name;
    item_name.className = 'item-name';
    item_box.appendChild(item_name);
    item_box.appendChild(create_percentage_bar(activity_level[name]))
    hours_info = document.createElement('p');
    hours_info.className = "hours-message";
    hours_info.innerHTML = hours_message(name);
    item_box.appendChild(hours_info);
    traffic_info = document.createElement('p');
    traffic_info.className = 'traffic-message';
    traffic_info.innerHTML = traffic_message(name);
    item_box.appendChild(traffic_info);
    rating_info = document.createElement('p');
    rating_info.className = 'rating-info';
    rating_info.innerHTML = rating(name);
    upvote_info = document.createElement('p');
    upvote_info.className = 'upvote-info';
    upvote_info.innerHTML = upvotes(name);
    mini_flex = document.createElement('div');
    mini_flex.className = 'mini-flex-container';
    mini_flex.appendChild(upvote_info);
    mini_flex.appendChild(rating_info);
    item_box.appendChild(mini_flex);
    upvote_btn = document.createElement('button');
    upvote_btn.innerHTML = '👍'
    upvote_btn.className = 'upvote-button';
    item_box.append(upvote_btn);
    return item_box;
}
init_flex_container(flex_container_context);


