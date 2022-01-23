let map;
const MAP_ID = "f9b1b1bd509cc691";
const MAP_VIEW_CENTER = {lat: 55.81200263720822, lng: 37.909069270225} // {lat: 55.743591, lng: 37.742944};

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
    addPoint(MAP_VIEW_CENTER)
    // =============
    const pointsJsonByRest = {
        "points": [
            {
                "lat": 55.81200263720822,
                "long": 37.909069270225,
                "type": "debate"
            },
            {
                "lat": 55.82996265856249,
                "long": 37.89585469749168,
                "type": "barbecue"
            }
        ]
    }
    for (let point of pointsJsonByRest.points) {
        addPoint(
            new google.maps.LatLng(point.lat, point.long),
            point.type
        )
    }
    // =============

    // todo del
    // google.maps.event.addListener(map, 'click', function (event) {
    //     addPoint(event);
    // });
}

/**
 * Добавляет событие на карту
 * @param latLng координата
 * @param eventType тип метки
 */
function addPoint(latLng, eventType) {

    const icon = {
        // https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/osi.svg
        url: getUrlIconByEventType(eventType),
        anchor: new google.maps.Point(20, 20),
        scaledSize: new google.maps.Size(25, 25)
    };

    // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
    const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: "Тип события:" + eventType,
        label: eventType,
        opacity: 0.9,
        draggable: false,
        icon: icon,
        zIndex: -20
    });
    // google.maps.event.addListener(marker, 'click', function (event) {
    marker.addListener('click', function (event) {
        // https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions
        console.log(" Здесь должна быть ссылка на событие и вообще красивая плашка рядом. А пока вот:" + event);
        infoWindowOptions.open({anchor: marker}) // !
    });
    let infoWindowOptions = new google.maps.InfoWindowOptions({
        content: "<html><body><p>Ссылка на событие:</p><a href='https://t.me/+89A4Bf-g2aowOTMy'/> </body></html>",
        pixelOffset: {width: 30, height: 30},

    });
    // let infoWindowOpenOptions = {anchor: marker}//new google.maps.InfoWindowOpenOptions(

}

function getUrlIconByEventType(eventType) {
    switch (eventType) {
        case "trip" :
        case "nature" :
        case "picnic" :
            return "https://raw.githubusercontent.com/r-n-aliev/2sa_place_proto/r-n-aliev-patch-1/files/svg/location-mountains.svg" //"barbecue"
        case "debate":
        case "club":
        case "cafe":
            return "https://raw.githubusercontent.com/r-n-aliev/2sa_place_proto/r-n-aliev-patch-1/files/svg/location-tea.svg"
        default:
            return "https://raw.githubusercontent.com/r-n-aliev/2sa_place_proto/r-n-aliev-patch-1/files/svg/location-default.svg"
    }
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

