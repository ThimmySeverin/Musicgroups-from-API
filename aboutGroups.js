'use strict'

const clickedPage = new URLSearchParams(window.location.search);
const groupId = clickedPage.get("musicGroupId");

const artistGroup = document.querySelector("#artistName");
const albumName = document.querySelector("#albumName");
const albumYear = document.querySelector("#albumYear")

// Gets info about the clicked musicgroup
async function getMusicInfo() {

    try {
        let apiresponse = await fetch(`https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/ReadItem?id=${groupId}&flat=false`);

        let data = await apiresponse.json();

        console.log(data);

        document.querySelector("#groupName").value = data.name;
        document.querySelector("#genre").value = data.strGenre;
        document.querySelector("#established").value = data.establishedYear;

        allArtists(data.artists);
        allAlbums(data.albums);
    }

    catch (error) {
        console.log("Couldn't get groupinfo")
    }
}

getMusicInfo();

function allArtists(data) {

    data.forEach(element => {
        const row = createRow();
        row.innerText = element.firstName + " " + element.lastName;
        artistGroup.appendChild(row);
    });

}

function allAlbums(data) {

    data.forEach(element => {

        const row = createRow();
        row.innerText = element.name;
        albumName.classList.add('col-md-10');
        albumName.appendChild(row);
    });

    data.forEach(element => {

        const row = createRow();
        row.innerText = element.releaseYear;
        albumYear.classList.add('col-md-2');

        albumYear.appendChild(row);
    });
}


// Creates a new row for each artist in the group, every album and year they realeased it. 
function createRow() {
    const div = document.createElement("div");
    div.classList.add('col-md-12', 'themed-grid-col');
    return div;
}










