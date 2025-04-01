'use strict'

let pageNr = 0;

const displaygroups = document.querySelector('#musicgroups');

let displaGroupName = document.querySelector("#groupName");

let displayCurrentPage = document.querySelector("#currentPage");

let nextPage = document.querySelector("#nextPage");
nextPage.addEventListener("click", getNextPage)

let previousPAge = document.querySelector("#previousPage");
previousPAge.addEventListener("click", getPreviousPage)

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getSearchedGroup)

let inputField = document.querySelector("#inputField");


// Fetch all the music groups in each specific page.
async function getMusicGroups() {

    try {

        let apiresponse = await fetch(`https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/Read?seeded=true&flat=false&pageNr=${pageNr}&pageSize=10`);

        if (!apiresponse.ok) {

            throw new Error("Something went wrong in API response");
        }

        let data = await apiresponse.json();

        const groups = data.pageItems;

        fillList(groups);

        return data;

    }

    catch (error) {
        console.log(error);
    }
};

// Gets the searched group
async function getSearchedGroup() {

    let searchedGroup = inputField.value;

    if (searchedGroup === "") {
        getMusicGroups();
    }

    try {

        let apiresponse = await fetch(`https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/Read?seeded=true&flat=false&filter=${searchedGroup}&pageNr=${pageNr}&pageSize=10`)

        if (!apiresponse.ok) {
            throw new Error("Something went wrong in searched api");
        }

        let data = await apiresponse.json();

        const groups = data.pageItems;

        fillList(groups);

        return data;

    }
    catch (error) {
        console.log(error);
    }
}

// Gets page either with default values or with the groups that match current search. 
async function getNextPage() {
    pageNr++;
    displayCurrentPage.innerText = `Page: ${pageNr}`;
    if (getSearchedGroup) {
        await getSearchedGroup();
    }
    else {
        await getMusicGroups();
    }
}

async function getPreviousPage() {
    pageNr--;
    displayCurrentPage.innerText = `Page: ${pageNr}`;

    if (pageNr < 0) {
        alert("You're at the start of the list");
        pageNr = 0;
        displayCurrentPage.innerText = `Page: ${pageNr}`;
    }
    else if (getSearchedGroup) {
        await getSearchedGroup();
    }
    else {
        await getMusicGroups();

    }
}


function fillList(data) {

    displaygroups.innerHTML = "";

    data.forEach(element => {
        const row = createRow();
        row.innerText = element.name;
        row.style.cursor = "pointer";

        row.addEventListener("click", () => {
            window.location.href = `aboutgroups.html?musicGroupId=${element.musicGroupId}`;
        })
        displaygroups.appendChild(row);

    });

}


function createRow() {
    const div = document.createElement("div");
    div.classList.add('col-md-10', 'themed-grid-col');
    return div;
}


(async () => {

    await getMusicGroups();

})()



