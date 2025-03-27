'use strict'

let pageNr = 0;

const displaygroups = document.querySelector('#musicgroups');

let displaGroupName = document.querySelector("#groupName");



async function getMusicGroups () {

    try {
console.log(`fetch data from pagenr ${pageNr}`);

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
getMusicGroups();

function getNewPage() {
  
    pageNr++;
    console.log(`ska öka pagenr vilket nu är ${pageNr}`);
    getMusicGroups();
}

function fillList(data) {

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





