let map;
const MAP_ID = "f9b1b1bd509cc691";
const MAP_VIEW_CENTER = {lat: 55.743591, lng: 37.742944};

/**
 * This func is callback when map is loaded (see index.html)
 */
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        mapId: MAP_ID,
        center: MAP_VIEW_CENTER,
        zoom: 15,
    });

    // TODO get points from https://4dd47923-1394-48c9-b0c6-0194682c6508.mock.pstmn.io/2sa/places
    addPoint({latLng : MAP_VIEW_CENTER})

    // todo del
    google.maps.event.addListener(map, 'click', function (event) {
        addPoint(event);
    });
}

function addPoint(event) {

    const icon = {
        url: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/osi.svg",
        anchor: new google.maps.Point(25, 50),
        scaledSize: new google.maps.Size(10, 10)
    };

    const marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        draggable: false,
        icon: icon,
        zIndex: -20
    });
}

//
// // ------ Adding marker
//
// function initialize() {
//
//     // var mapOptions = {
//     //     zoom: 5,
//     //     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     //     center: new google.maps.LatLng(0,0)
//     // };
//     //
//     // map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//     //
//     // google.maps.event.addListener(map, 'click', function(event) {
//     //     addPoint(event);
//     // });
// }


// initialize();

