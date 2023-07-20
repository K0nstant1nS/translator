/* Constants and variables */
const baseUrl = "https://api.mymemory.translated.net";
const method = "get";
const containerClassName = "translate-container-qwsfrfgfewq";
let to = "";
let from = "";

/* Funcs */
function getRequestUrl(method, text, languageFrom, languageTo) {
    return `${baseUrl}/${method}?q=${text}&langpair=${languageFrom}|${languageTo}`
}

function constructContainer(coords) {
    const element = document.createElement("div")
    element.style.top = `${coords.y}px`;
    element.style.left = `${coords.x}px`;
    element.classList.add(containerClassName);
    element.addEventListener("mousedown", (e)=>{
        e.stopPropagation()
    })
    element.addEventListener("mouseup", (e)=>{
        e.stopPropagation()
    })

    return element
};

function constructData(matches){
    const results = matches.map(item=>item.translation)
    return results.join("/")
}

async function gen(text, coords, get, set) {
    const element = constructContainer(coords)
    document.body.append(element);
    console.log(get, set)
    get = get ? get : "en"
    set = set ? set : "ru"
    try {
        const response = await fetch(getRequestUrl(method, text, get, set));
        const result = await response.json();
        element.textContent = constructData(result.matches);
    } catch (error) {
        console.error(error);
    }
};

function removeContainer() {
    const elem =  document.querySelector(`.${containerClassName}`)
    if(elem){
        elem.remove()
    }
}

function configurePosition(e){
    const {x, y} = e;
    const {bottom} = e.target.getBoundingClientRect();
    let res = y + window.pageYOffset
    return {x: x, y: res};
}

function selectHandler(e){
    const selected = window.getSelection().toString();
    selected && gen(selected, configurePosition(e), from, to)
}

/* Main */
    chrome.storage.local.get("languages").then(data=>{
        from = data.languages.from;
        to = data.languages.to;
        console.log(from, to)

        document.addEventListener("mouseup", selectHandler)
        document.addEventListener("mousedown", removeContainer)
    })

    chrome.storage.onChanged.addListener(()=>{
        console.log("changing")
        document.removeEventListener("mouseup", selectHandler)
        document.removeEventListener("mousedown", removeContainer)
        chrome.storage.local.get("languages").then(data=>{
            console.log("changed")
            from = data.languages.from;
            to = data.languages.to;
            console.log(from, to)
    
            document.addEventListener("mouseup", selectHandler)
            document.addEventListener("mousedown", removeContainer)
        })
    })



