<template>
<body>
	<div>
		<div>
			<h2>Drop a pin or your home</h2>
			<label>
				<gmap-autocomplete
          @place_changed="setPlace"></gmap-autocomplete>
				<select placeholder ="State" name="state">
					<option value="">Select State</option>
					<option value="Alabama">Alabama</option>
					<option value="Alaska">Alaska</option>
					<option value="Arizona">Arizona</option>
					<option value="Arkansas">Arkansas</option>
					<option value="California">California</option>
					<option value="Colorado">Colorado</option>
					<option value="Connecticut">Connecticut</option>
					<option value="Delaware">Delaware</option>
					<option value="District of Columbia">District of Columbia</option>
					<option value="Florida">Florida</option>
					<option value="Georgia">Georgia</option>
					<option value="Guam">Guam</option>
					<option value="Hawaii">Hawaii</option>
					<option value="Idaho">Idaho</option>
					<option value="Illinois">Illinois</option>
					<option value="Indiana">Indiana</option>
					<option value="Iowa">Iowa</option>
					<option value="Kansas">Kansas</option>
					<option value="Kentucky">Kentucky</option>
					<option value="Louisiana">Louisiana</option>
					<option value="Maine">Maine</option>
					<option value="Maryland">Maryland</option>
					<option value="Massachusetts">Massachusetts</option>
					<option value="Michigan">Michigan</option>
					<option value="Minnesota">Minnesota</option>
					<option value="Mississippi">Mississippi</option>
					<option value="Missouri">Missouri</option>
					<option value="Montana">Montana</option>
					<option value="Nebraska">Nebraska</option>
					<option value="Nevada">Nevada</option>
					<option value="New Hampshire">New Hampshire</option>
					<option value="New Jersey">New Jersey</option>
					<option value="New Mexico">New Mexico</option>
					<option value="New York">New York</option>
					<option value="North Carolina">North Carolina</option>
					<option value="North Dakota">North Dakota</option>
					<option value="Northern Marianas Islands">Northern Marianas Islands</option>
					<option value="Ohio">Ohio</option>
					<option value="Oklahoma">Oklahoma</option>
					<option value="Oregon">Oregon</option>
					<option value="Pennsylvania">Pennsylvania</option>
					<option value="Puerto Rico">Puerto Rico</option>
					<option value="Rhode Island">Rhode Island</option>
					<option value="South Carolina">South Carolina</option>
					<option value="South Dakota">South Dakota</option>
					<option value="Tennessee">Tennessee</option>
					<option value="Texas">Texas</option>
					<option value="Utah">Utah</option>
					<option value="Vermont">Vermont</option>
					<option value="Virginia">Virginia</option>
					<option value="Virgin Islands">Virgin Islands</option>
					<option value="Washington">Washington</option>
					<option value="West Virginia">West Virginia</option>
					<option value="Wisconsin">Wisconsin</option>
					<option value="Wyoming">Wyoming</option>
				</select>
				<input placeholder ="Zip Code" name="zip" type="text" inputmode="numeric" pattern="[0-5]*">
					<button @click="addMarker"> Add </button>
				</label>
				<br/>
			</div>
			<br>
				<gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
					<gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
				</gmap-map>
				<div>
					<h2>Please follow these instructions</h2>
					<ol type = "1">
						<li> Start with entering your location, State, and Zip Code at the top.</li>
						<li> After, adding the pin the address of your selcted location will display, use the yellow man as a street view to verify the pin is on your specified location.</li>
						<li> Once the pin is where you like click the "Click to find out!" button this will display your correspoding coordinates.</li>
					</ol>
				</div>
				<div>
					<h2> Your selected location is: </h2>
					<button v-on:click="say">Click to find out!</button>
				</div>
			</div>
      </body>
		</template>
		<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Charlotte to keep it simple
     
      center: { lat: 35.2271, lng: -80.84312 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate(); 
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
	  reverseGeocode(coordinates){
      const that = this;
      axios
        .get(`https://maps.google.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${AIzaSyAgloUZh2Rba0RBLHaO_J-A_EEIQlG3m1A}`)
          .then(response => {
            console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'location': marker }, function(results, status){
        if (status === 'OK') {
          if (results[0]) {
            alert ( "Selected address: " + results[0].formatted_address) ;
          } else {
            console.log(status);
            window.alert('No results found');
          }
        }
      })
        

      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
     say: function () {
    if ('geolocation' in navigator) {

    navigator.geolocation.getCurrentPosition(
      position => alert( "Lat: " + this.currentPlace.geometry.location.lat() + "\n" + "Lng: " + this.currentPlace.geometry.location.lng()),
      err => alert(`Error (${err.code}): ${err.message}`)
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }

    }
  }
  
  
};
</script>
		<style scoped>
li {
  display: list-item;
  list-style-position: inside;
  text-align: left;
  margin: 1em 0;
}
 
</style>