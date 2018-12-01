(function() {

    /**
     * Variables
     */
    var user_id = '1111';
    var user_fullname = 'John';
    var lng = -122.08;
    var lat = 37.38;

    /**
     * Initialize
     */
    function init() {
        // Register event listeners
    	//listen Nearby button, My favorite button and Recommandation button
        $('nearby-btn').addEventListener('click', loadNearbyItems);//只传给$一个tag
        $('fav-btn').addEventListener('click', loadFavoriteItems);
        $('recommend-btn').addEventListener('click', loadRecommendedItems);

        var welcomeMsg = $('welcome-msg');
        welcomeMsg.innerHTML = 'Welcome, ' + user_fullname;
        loadNearbyItems();
    }
    
    function loadNearbyItems() {
    	activeBtn('nearby-btn');
    	var nearbyItems = mockSearchResponse;
    	listItems(nearbyItems);
    }
    
    function loadFavoriteItems() {
    	activeBtn('fav-btn');
    	var favoriteItems = mockSearchResponse.slice(3, 6);
    	listItems(favoriteItems);
    }
    
    function loadRecommendedItems() {
    	activeBtn('recommend-btn');
    	var recommendedItems = mockSearchResponse.slice(10);
    	listItems(recommendedItems);
    }

    // -----------------------------------
    // Helper Functions
    // -----------------------------------

    /**
     * A helper function that makes a navigation button active
     * 
     * @param btnId -
     *            The id of the navigation button
     */
    function activeBtn(btnId) {
        var btns = document.getElementsByClassName('main-nav-btn');

        // deactivate all navigation buttons
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = btns[i].className.replace(/\bactive\b/, '');
        }

        // active the one that has id = btnId
        var btn = $(btnId);
        btn.className += ' active';
    }

    function showLoadingMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
            msg + '</p>';
    }

    function showWarningMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> ' +
            msg + '</p>';
    }

    function showErrorMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> ' +
            msg + '</p>';
    }

    /**
     * A helper function that creates a DOM element <tag options...>
     * 老师自己的helper function $
     * @param tag
     * @param options
     * @returns
     */
    function $(tag, options) {
        if (!options) {//options = null 时候执行？
            return document.getElementById(tag);
        }

        var element = document.createElement(tag);

        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                element[option] = options[option];//把key对应的value赋值给创建的element
            }
        }

        return element;
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function showElement(element, style) {
        var displayStyle = style ? style : 'block';
        element.style.display = displayStyle;
    }

    // -------------------------------------
    // Create item list
    // -------------------------------------

    /**
     * List items
     * 
     * @param items -
     *            An array of item JSON objects
     */
    function listItems(items) {
        // Clear the current results
        var itemList = $('item-list');
        itemList.innerHTML = '';//清空

        for (var i = 0; i < items.length; i++) {
            addItem(itemList, items[i]);
        }
    }

    /**
     * Add item to the list
     * 
     * @param itemList -
     *            The
     *            <ul id="item-list">
     *            tag
     * @param item -
     *            The item data (JSON object)
     */
    function addItem(itemList, item) {
        var item_id = item.item_id;

        // create the <li> tag and specify the id and class attributes
        var li = $('li', {
            id: 'item-' + item_id,
            className: 'item'
        });

        // set the data attribute
        li.dataset.item_id = item_id;
        li.dataset.favorite = item.favorite;

        // item image
        if (item.image_url) {
            li.appendChild($('img', {
                src: item.image_url
            }));
        } else {
            li.appendChild($(
                'img', {
                    src: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
                }))
        }
        // section
        var section = $('div', {});

        // title
        var title = $('a', {
            href: item.url,
            target: '_blank',
            className: 'item-name'
        });
        title.innerHTML = item.name;
        section.appendChild(title);

        // category
        var category = $('p', {
            className: 'item-category'
        });
        category.innerHTML = 'Category: ' + item.categories.join(', ');
        section.appendChild(category);

        var stars = $('div', {
            className: 'stars'
        });

        for (var i = 0; i < item.rating; i++) {
            var star = $('i', {
                className: 'fa fa-star'
            });
            stars.appendChild(star);
        }

        if (('' + item.rating).match(/\.5$/)) {
            stars.appendChild($('i', {
                className: 'fa fa-star-half-o'
            }));
        }

        section.appendChild(stars);

        li.appendChild(section);

        // address
        var address = $('p', {
            className: 'item-address'
        });

        address.innerHTML = item.address.replace(/,/g, '<br/>').replace(/\"/g, '');
        li.appendChild(address);

        // favorite link
        var favLink = $('p', {
            className: 'fav-link'
        });

        favLink.appendChild($('i', {
            id: 'fav-icon-' + item_id,
            className: item.favorite ? 'fa fa-heart' : 'fa fa-heart-o'
        }));

        li.appendChild(favLink);

        itemList.appendChild(li);
    }
    
    init();
    
})();


/* mock.js */
/* mock.js */
/* mock.js */


var mockSearchResponse = [
	   {
		      "country":"United States Of America",
		      "address":"525 W Santa Clara,San Jose",
		      "item_id":"G5vYZ4aioMDSp",
		      "city":"San Jose",
		      "image_url":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
		      "latitude":37.33276191,
		      "rating":0,
		      "url":"https://www.ticketmaster.com/pnk-beautiful-trauma-world-tour-san-jose-california-04-17-2019/event/1C00549B11DFBCD6",
		      "zipcode":"95113",
		      "name":"P!NK: BEAUTIFUL TRAUMA WORLD TOUR",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":true,
		      "longitude":-121.90122373
		   },
		   {
		      "country":"United States Of America",
		      "address":"500 David J Stern Walk,Sacramento",
		      "item_id":"G5vYZ4123ZQeW",
		      "city":"Sacramento",
		      "image_url":"https://s1.ticketm.net/dam/a/88c/ee936015-4c7c-4ca1-9b01-c98296c6488c_733281_RETINA_PORTRAIT_3_2.jpg",
		      "latitude":38.580372,
		      "rating":0,
		      "description":"All floor seats for concerts and family shows come with club access. Event Lineup: DC Young Fly IamZoie Emmanuel Hudson Justina Valentine Conceited Chico Bean Hitman Holla Charlie Clips DJ D-Wrek Rip Micheals Musical Guests: The Game, Waka Flocka",
		      "url":"https://www.ticketmaster.com/nick-cannon-presents-wild-n-out-sacramento-california-09-30-2018/event/1C0054A3D201A0BD",
		      "zipcode":"95814",
		      "name":"NICK CANNON PRESENTS: WILD 'N OUT LIVE",
		      "state":"California",
		      "categories":[
		         "Arts & Theatre"
		      ],
		      "favorite":true,
		      "longitude":-121.500231
		   },
		   {
		      "country":"United States Of America",
		      "address":"1111 S. Figueroa St.,Los Angeles",
		      "item_id":"Z7r9jZ1AeuVP8",
		      "city":"Los Angeles",
		      "image_url":"https://s1.ticketm.net/dam/a/938/4239ddf3-1b11-48ef-bb6b-0de65232d938_692871_RECOMENDATION_16_9.jpg",
		      "latitude":34.053101,
		      "rating":0,
		      "url":"http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2374950",
		      "zipcode":"90017",
		      "name":"BTS",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-118.2649
		   },
		   {
		      "country":"United States Of America",
		      "address":"525 W Santa Clara,San Jose",
		      "item_id":"G5vYZ4ujz2l-i",
		      "city":"San Jose",
		      "image_url":"https://s1.ticketm.net/dam/a/efb/58b51de6-1452-4f5a-aad3-4b9bad4daefb_741121_ARTIST_PAGE_3_2.jpg",
		      "latitude":37.33276191,
		      "rating":0,
		      "url":"https://www.ticketmaster.com/ozuna-san-jose-california-12-02-2018/event/1C0054D7383EB86C",
		      "zipcode":"95113",
		      "name":"Ozuna",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-121.90122373
		   },
		   {
		      "country":"United States Of America",
		      "address":"7000 Coliseum Way,Oakland",
		      "item_id":"G5vYZ4kTkfMYz",
		      "city":"Oakland",
		      "image_url":"https://s1.ticketm.net/dam/a/3be/19795940-b1d0-4be9-a695-95352b9b33be_549691_RETINA_PORTRAIT_3_2.jpg",
		      "latitude":37.7515541,
		      "rating":0,
		      "description":"* ADA seats are all seats in rows 1A, 7A, 37A, 38A",
		      "url":"https://www.ticketmaster.com/oakland-raiders-vs-los-angeles-rams-oakland-california-09-10-2018/event/1C00546FC6537C38",
		      "zipcode":"94621",
		      "name":"Oakland Raiders vs. Los Angeles Rams",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-122.200542
		   },
		   {
		      "country":"United States Of America",
		      "address":"1111 S. Figueroa St.,Los Angeles",
		      "item_id":"Z7r9jZ1Aeuyu8",
		      "city":"Los Angeles",
		      "image_url":"https://s1.ticketm.net/dam/a/938/4239ddf3-1b11-48ef-bb6b-0de65232d938_692871_RECOMENDATION_16_9.jpg",
		      "latitude":34.053101,
		      "rating":0,
		      "url":"http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2379350",
		      "zipcode":"90017",
		      "name":"BTS",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-118.2649
		   },
		   {
		      "country":"United States Of America",
		      "address":"4900 Marie P. DeBartolo Way,Santa Clara",
		      "item_id":"G5vYZ46K5APh0",
		      "city":"Santa Clara",
		      "image_url":"https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_TABLET_LANDSCAPE_LARGE_16_9.jpg",
		      "latitude":37.40367671,
		      "rating":0,
		      "description":"For group sales of 20+ tickets, please call (415) GO-49ERS",
		      "url":"https://www.ticketmaster.com/san-francisco-49ers-vs-oakland-raiders-santa-clara-california-11-01-2018/event/1C005474CB1656E4",
		      "zipcode":"95054",
		      "name":"San Francisco 49ers vs. Oakland Raiders",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-121.97034311
		   },
		   {
		      "country":"United States Of America",
		      "address":"2650 East Shaw Ave.,Fresno",
		      "item_id":"G5vYZ4aBBMXm3",
		      "city":"Fresno",
		      "image_url":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
		      "latitude":36.8086726,
		      "rating":0,
		      "url":"https://www.ticketmaster.com/pnk-beautiful-trauma-world-tour-fresno-california-04-15-2019/event/1C00549EBADFEB92",
		      "zipcode":"93710",
		      "name":"P!NK: BEAUTIFUL TRAUMA WORLD TOUR",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-119.7394542
		   },
		   {
		      "country":"United States Of America",
		      "address":"4900 Marie P. DeBartolo Way,Santa Clara",
		      "item_id":"G5vYZ46K1WgQ4",
		      "city":"Santa Clara",
		      "image_url":"https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_TABLET_LANDSCAPE_LARGE_16_9.jpg",
		      "latitude":37.40367671,
		      "rating":0,
		      "description":"For group sales of 20+ tickets, please call (415) GO-49ERS",
		      "url":"https://www.ticketmaster.com/san-francisco-49ers-vs-denver-broncos-santa-clara-california-12-09-2018/event/1C005474CAF75695",
		      "zipcode":"95054",
		      "name":"San Francisco 49ers vs. Denver Broncos",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-121.97034311
		   },
		   {
		      "country":"United States Of America",
		      "address":"1101 W. McKinley Ave.,Pomona",
		      "item_id":"vvG10Z426r8AxK",
		      "city":"Pomona",
		      "image_url":"https://s1.ticketm.net/dam/a/3a1/8ca652b6-d7e2-448b-bef5-5c4dbb98c3a1_678581_EVENT_DETAIL_PAGE_16_9.jpg",
		      "latitude":34.0841943,
		      "rating":0,
		      "url":"https://www.ticketmaster.com/kane-brown-pomona-california-09-07-2018/event/090054F1DE405893",
		      "zipcode":"91768",
		      "name":"Kane Brown",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-117.7649832
		   },
		   {
		      "country":"United States Of America",
		      "address":"4900 Marie P. DeBartolo Way,Santa Clara",
		      "item_id":"G5vYZ46K5vPQW",
		      "city":"Santa Clara",
		      "image_url":"https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_TABLET_LANDSCAPE_LARGE_16_9.jpg",
		      "latitude":37.40367671,
		      "rating":0,
		      "description":"For group sales of 20+ tickets, please call (415) GO-49ERS",
		      "url":"https://www.ticketmaster.com/san-francisco-49ers-vs-los-angeles-santa-clara-california-10-21-2018/event/1C005474CB0656BD",
		      "zipcode":"95054",
		      "name":"San Francisco 49ers vs. Los Angeles Rams",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-121.97034311
		   },
		   {
		      "country":"United States Of America",
		      "address":"500 David J Stern Walk,Sacramento",
		      "item_id":"G5vYZ41kgLl5u",
		      "city":"Sacramento",
		      "image_url":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
		      "latitude":38.580372,
		      "rating":0,
		      "description":"All floor seats for concerts and family shows come with club access.",
		      "url":"https://www.ticketmaster.com/pnk-beautiful-trauma-world-tour-sacramento-california-04-10-2019/event/1C0054A1B57EB2CD",
		      "zipcode":"95814",
		      "name":"P!NK: BEAUTIFUL TRAUMA WORLD TOUR",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-121.500231
		   },
		   {
		      "country":"United States Of America",
		      "address":"7000 Coliseum Way,Oakland",
		      "item_id":"G5vYZ4al6bF94",
		      "city":"Oakland",
		      "image_url":"https://s1.ticketm.net/dam/a/938/4239ddf3-1b11-48ef-bb6b-0de65232d938_692871_RECOMENDATION_16_9.jpg",
		      "latitude":37.7515541,
		      "rating":0,
		      "description":"-No refunds, no exchanges -Doors open 2 1/2 hours before the show -When facing the stage, seats are numbered right to left -Sections that begin with a letter are chairs on the floor that are not inclined -Sections that begin with a number are arena seats that incline as the rows increase -Row A5 in sections 1, 2, and 5 are the first row of sections 101, 102, and 105, respectively -Row A4 in sections 7, 8, 10, 13, 14, 15, and 16 are the first row of sections 107, 108, 110, 113, 114, 115, and 116, respectively. -To buy disabled seats, click on the ADA logo next to 'Find Tickets' and fill out the form -For ADA purchases, call 1-800-745-3000.",
		      "url":"https://www.ticketmaster.com/bts-world-tour-love-yourself-oakland-california-09-12-2018/event/1C00549AC76085D5",
		      "zipcode":"94621",
		      "name":"BTS WORLD TOUR 'LOVE YOURSELF'",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-122.2015715
		   },
		   {
		      "country":"United States Of America",
		      "address":"One Amphitheatre Parkway,Mountain View",
		      "item_id":"G5vYZ46K4OPWI",
		      "city":"Mountain View",
		      "image_url":"https://s1.ticketm.net/dam/a/ab1/70830e18-abb7-4ce4-a558-9aa2f3a4bab1_623081_TABLET_LANDSCAPE_3_2.jpg",
		      "latitude":37.426718,
		      "rating":0,
		      "description":"General parking is included in the final purchase price.",
		      "url":"http://concerts.livenation.com/event/1C005474D5825F68",
		      "zipcode":"94043",
		      "name":"Jason Aldean: High Noon Neon Tour 2018",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-122.080722
		   },
		   {
		      "country":"United States Of America",
		      "address":"4900 Marie P. DeBartolo Way,Santa Clara",
		      "item_id":"G5vYZ46K1BgQa",
		      "city":"Santa Clara",
		      "image_url":"https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_TABLET_LANDSCAPE_LARGE_16_9.jpg",
		      "latitude":37.40367671,
		      "rating":0,
		      "description":"For group sales of 20+ tickets, please call (415) GO-49ERS",
		      "url":"https://www.ticketmaster.com/san-francisco-49ers-vs-arizona-cardinals-santa-clara-california-10-07-2018/event/1C005474CAEB5689",
		      "zipcode":"95054",
		      "name":"San Francisco 49ers vs. Arizona Cardinals",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-121.97034311
		   },
		   {
		      "country":"United States Of America",
		      "address":"7000 Coliseum Way,Oakland",
		      "item_id":"G5vYZ4kTkoEYt",
		      "city":"Oakland",
		      "image_url":"https://s1.ticketm.net/dam/a/3be/19795940-b1d0-4be9-a695-95352b9b33be_549691_RETINA_PORTRAIT_3_2.jpg",
		      "latitude":37.7515541,
		      "rating":0,
		      "description":"* ADA seats are all seats in rows 1A, 7A, 37A, 38A",
		      "url":"https://www.ticketmaster.com/oakland-raiders-vs-cleveland-browns-oakland-california-09-30-2018/event/1C00546FC6467C29",
		      "zipcode":"94621",
		      "name":"Oakland Raiders vs. Cleveland Browns",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-122.200542
		   },
		   {
		      "country":"United States Of America",
		      "address":"7000 Coliseum Way,Oakland",
		      "item_id":"G5vYZ4kTkC9Yb",
		      "city":"Oakland",
		      "image_url":"https://s1.ticketm.net/dam/a/3be/19795940-b1d0-4be9-a695-95352b9b33be_549691_RETINA_PORTRAIT_3_2.jpg",
		      "latitude":37.7515541,
		      "rating":0,
		      "description":"* ADA seats are all seats in rows 1A, 7A, 37A, 38A",
		      "url":"https://www.ticketmaster.com/oakland-raiders-vs-denver-broncos-oakland-california-12-24-2018/event/1C00546FC6397C18",
		      "zipcode":"94621",
		      "name":"Oakland Raiders vs. Denver Broncos",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-122.200542
		   },
		   {
		      "country":"United States Of America",
		      "address":"4900 Marie P. DeBartolo Way,Santa Clara",
		      "item_id":"G5vYZ46K5dPha",
		      "city":"Santa Clara",
		      "image_url":"https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_TABLET_LANDSCAPE_LARGE_16_9.jpg",
		      "latitude":37.40367671,
		      "rating":0,
		      "description":"For group sales of 20+ tickets, please call (415) GO-49ERS",
		      "url":"https://www.ticketmaster.com/san-francisco-49ers-vs-new-york-santa-clara-california-11-12-2018/event/1C005474CB0E56C9",
		      "zipcode":"95054",
		      "name":"San Francisco 49ers vs. New York Giants",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-121.97034311
		   },
		   {
		      "country":"United States Of America",
		      "address":"4900 Marie P. DeBartolo Way,Santa Clara",
		      "item_id":"G5vYZ46K5ZAQE",
		      "city":"Santa Clara",
		      "image_url":"https://s1.ticketm.net/dam/a/f62/09dfb1e3-e77e-4ca0-b88a-f79a32d2ff62_549721_TABLET_LANDSCAPE_LARGE_16_9.jpg",
		      "latitude":37.40367671,
		      "rating":0,
		      "description":"For group sales of 20+ tickets, please call (415) GO-49ERS",
		      "url":"https://www.ticketmaster.com/san-francisco-49ers-vs-detroit-lions-santa-clara-california-09-16-2018/event/1C005474CB0056A7",
		      "zipcode":"95054",
		      "name":"San Francisco 49ers vs. Detroit Lions",
		      "state":"California",
		      "categories":[
		         "Sports"
		      ],
		      "favorite":false,
		      "longitude":-121.97034311
		   },
		   {
		      "country":"United States Of America",
		      "address":"3900 W Manchester Blvd.,Inglewood",
		      "item_id":"vv1Fe8vK3KuaZ75e61",
		      "city":"Inglewood",
		      "image_url":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
		      "latitude":33.9583,
		      "rating":0,
		      "description":"American Express has set a two-order limit for this tour presale. This limit applies across all Cards associated with all of your American Express accounts. Prepaid cards are not eligible for this presale. \"",
		      "url":"https://www.ticketmaster.com/pnk-beautiful-trauma-world-tour-inglewood-california-04-19-2019/event/090053493349A169",
		      "zipcode":"90305",
		      "name":"P!NK: BEAUTIFUL TRAUMA WORLD TOUR",
		      "state":"California",
		      "categories":[
		         "Music"
		      ],
		      "favorite":false,
		      "longitude":-118.341868
		   }
		];








