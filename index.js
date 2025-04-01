let displayAmountOfAlbums = document.querySelector("#amountOfAlbum");
let displayAmountOfArtists = document.querySelector("#amountOfArtists");
let displayAmountOfGroups = document.querySelector("#amountOfGroups");


// Shows amount of albums, artists and groups in API
(async () => {
    try {
        let apiresponse = await fetch ("https://seido-webservice-307d89e1f16a.azurewebsites.net/api/Guest/Info")

        if (!apiresponse.ok) {
            console.log("Something went wrong in API response");
        }

        let data = await apiresponse.json();

        displayAmountOfGroups.innerText = data.db.nrSeededMusicGroups + " music groups";
        displayAmountOfAlbums.innerText = data.db.nrSeededAlbums + " albums";
        displayAmountOfArtists.innerText = data.db.nrSeededArtists + "  artists";

       
    } catch (error) {
        console.log(error);
    }

})();