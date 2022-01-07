function initMap() {
    const myLatlng = {
        lat: 24.814643,
        lng: 120.988736
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });

    let circle = null;
    let marker = null;

    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        if (circle) {
            circle.setMap(null);
        }
        if (marker) {
            marker.setMap(null);
        }
        marker = new google.maps.Marker({
            position: mapsMouseEvent.latLng,
            map,
        });
        circle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.3,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
            map,
            center: mapsMouseEvent.latLng,
            radius: +document.getElementById("distance").value,
        });
        document.getElementById("center-point").setAttribute('value', mapsMouseEvent.latLng);
        document.getElementById("center-point").setAttribute('data-lat', mapsMouseEvent.latLng.lat());
        document.getElementById("center-point").setAttribute('data-lng', mapsMouseEvent.latLng.lng());


        // Create a new InfoWindow.
        // infoWindow = new google.maps.InfoWindow({
        //     position: mapsMouseEvent.latLng,
        // });
        // infoWindow.setContent(
        //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        // );
        // infoWindow.open(map);
    });
}