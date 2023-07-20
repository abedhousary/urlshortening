let shortenbtn = document.querySelector("#shortenthat");
let urlinp = document.querySelector(".cusinp");
let errormessage = document.querySelector(".errormsg")
let historycon = document.querySelector(".history-container");

let shortedlink = ""
function getCopyBtn() {
    let copybtns = document.querySelectorAll(".copy");
    copybtns.forEach((e)=>{
        e.addEventListener("click", function copyElementIdToClipboard() {
            copybtns.forEach((i)=>{i.classList.remove("copied");i.innerHTML = "Copy"})
            e.classList.add("copied");
            e.innerHTML = "Copied!"
            // Create a temporary input element
            const tempInput = document.createElement('input');

            // Set its value to the element ID
            tempInput.value = e.id;

            // Append the input element to the body
            document.body.appendChild(tempInput);

            // Select the input element's text
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); // For mobile devices

            // Copy the selected text to the clipboard
            document.execCommand('copy');

            // Remove the temporary input element from the DOM
            document.body.removeChild(tempInput);

        }

)
    })
}
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            shortedlink = data['result']['short_link']
            console.log(shortedlink);
            return data['result']['short_link'];
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createHistoryElement(enteredlink, shortlink) {
    // Create the main history element
    const historyElement = document.createElement('div');
    historyElement.classList.add('history-link');

    // Create the link-entered div
    const linkEnteredDiv = document.createElement('div');
    linkEnteredDiv.classList.add('link-entered');
    linkEnteredDiv.innerHTML = enteredlink;
    historyElement.appendChild(linkEnteredDiv);

    // Create the link shortened div
    const linkShortenedDiv = document.createElement('div');
    linkShortenedDiv.innerHTML = shortlink
    linkShortenedDiv.classList.add('link-shortened');
    historyElement.appendChild(linkShortenedDiv);

    // Create the button element with bg class
    const buttonElement = document.createElement('div');
    buttonElement.innerHTML = "Copy";
    buttonElement.id = shortlink;
    buttonElement.classList.add('btn');
    buttonElement.classList.add('withbg');
    buttonElement.classList.add('nbrdr');
    buttonElement.classList.add('copy');
    historyElement.appendChild(buttonElement);

    return historyElement;
}


shortenbtn.onclick = () => {
    if (urlinp.value == 0) {
        urlinp.style.border = "4px solid var(--Red)";
        errormessage.style.opacity = "1";
    } else {
        fetchData(`https://api.shrtco.de/v2/shorten?url=${urlinp.value}`)
        setTimeout(() => {
            const historyElement = createHistoryElement(urlinp.value, shortedlink);
            historycon.appendChild(historyElement);
        }, 2000);
        setTimeout(() => {
            getCopyBtn();
        }, 2000);
    }
}

