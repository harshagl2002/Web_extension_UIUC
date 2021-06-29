
function getCourseInfo(searchText) {
    const regexNumbers = /[0-9]+/
    const name = searchText.split(regexNumbers)[0].toUpperCase().trim();
    const possibleNumbers = searchText.match(regexNumbers);
    let number = null;
    if (possibleNumbers !== null) {
        number = possibleNumbers[0].trim();
    }
    return [name, number];
}

function addLocations(rows) {
    if (rows.length === 0) {
        return;
    }

    const rowArr = Array.from(rows);
    const infoRows = rowArr.filter(row => row.id.startsWith("uid"));
    infoRows.forEach((infoRow) => {
        const locationElement = infoRow.getElementsByClassName("app-meeting")[4];
        const locationText = locationElement.textContent;
        const mapsLink = encodeURI(`https://www.google.com/maps/search/${locationText}+UIUC+USA`);
        locationElement.innerHTML = `<a href="${mapsLink}" target="_blank">${locationText}</a>`;
    });
}
const rows = document.getElementsByTagName("tr");
addLocations(rows);

const searchForm = document.getElementById("subjectAutoJump-form");
searchForm.addEventListener("submit", (event) => {
    console.log("Got a submit henlo");
    const searchBox = document.getElementById("subjectAutoJump");
    const searchText = searchBox.value;
    console.log(searchText);

    const [name, number] = getCourseInfo(searchText);
    console.log(`${name}-${number}`);

    if (number == null) {
        return;
    }

    const newURL = `https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/${name}/${number}`;
    window.location.href = newURL;
    event.preventDefault();
});
