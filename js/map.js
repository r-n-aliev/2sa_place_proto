let map;
const HAL_EMBEDDED_FIELD = "_embedded";
const MAP_ID = "f9b1b1bd509cc691";
// "https://4dd47923-1394-48c9-b0c6-0194682c6508.mock.pstmn.io/2sa/places";
const PLACES_API_URL = "https://glacial-garden-00674.herokuapp.com/places";
const MAP_VIEW_CENTER =  {lat: 55.81200263720822, lng: 37.909069270225} // {latitude: 55.743591, longitude: 37.742944};

/**
 * This func is callback when map is loaded (see index.html)
 */
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        mapId: MAP_ID,
        center: MAP_VIEW_CENTER,
        zoom: 12,
    });

    getCurrentLocationAndSetAsTheMiddleOfMap()

    _httpGetAsync(PLACES_API_URL, addEventsToMap)
}

function addEventsToMap(apiResponse) {
    let json = JSON.parse(apiResponse)
    for (let point of json[HAL_EMBEDDED_FIELD].places) {
        addPoint(
            new google.maps.LatLng(point.latitude, point.longitude),
            point.type
        )
    }
}

/**
 * Добавляет событие на карту
 * @param latLng координата
 * @param eventType тип метки
 */
function addPoint(latLng, eventType) {

    const icon = {
        url: getUrlIconByEventType(eventType),
        anchor: new google.maps.Point(5, 5),
        scaledSize: new google.maps.Size(25, 25), // для всех один размер? хм
        labelOrigin: new google.maps.Point(10, 10)
    };

    // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
    const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: eventType, // "Тип события:"
        // label: eventType,
        opacity: 0.9,
        draggable: false,
        icon: icon,
        zIndex: -20
    });
    // https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions
    marker.addListener('click', function () {
        infoWindow.open({anchor: marker})
    });
    let infoWindow = new google.maps.InfoWindow({
        content: "<html lang=\"ru\"><body><b><i>" + eventType + "</i></b><p>Обсудить событие</p><a href='https://t.me/+89A4Bf-g2aowOTMy' target='_blank' rel='noopener noreferrer'>в Telegram</a></body></html>",
        pixelOffset: {width: 30, height: 30},
    });
}

// Util functions below -------------------
function getUrlIconByEventType(eventType) {
    switch (eventType) {
        case "me" :
            return "https://raw.githubusercontent.com/r-n-aliev/2sa_place_proto/r-n-aliev-patch-1/files/svg/location-star.svg"
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
        // return "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/osi.svg"
    }
}

function getCurrentLocationAndSetAsTheMiddleOfMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            if (!position || !position.coords) return // for example, when there wasn't given the <geolocation> permission for this site
            let initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log(">>> initialLocation = " + initialLocation)
            map.setCenter(initialLocation);

            addPoint(initialLocation, MARKER_TYPE_ME)
        });

    }
}

function _httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

const MARKER_TYPE_ME = "me"
