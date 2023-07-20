const button = document.querySelector(".submit");
const selects = document.querySelectorAll("select");
const sourceLang = document.getElementById("from");
const targetLang = document.getElementById("to");



function setButtonEnabled(button){
    button.disabled = false;
}

function setButtonDisabled(button){
    button.disabled = true;
}


function selectDisableDuplicated(selects){
    const [selectFrom, selectTo] = selects;
    selectTo.querySelectorAll("option").forEach(option=> option.disabled = false)
    selectTo.querySelector(`[value=${selectFrom.value}]`).disabled = true;
}


selects.forEach(select=>{
    select.addEventListener("change", ()=>{
        setButtonEnabled(button);
        selectDisableDuplicated(selects)
    })
});

button.addEventListener("click", (e)=>{
    chrome.storage.local.set({
        languages: {
            from: sourceLang.value,
            to: targetLang.value
        }
    })
    setButtonDisabled(button)
})

selectDisableDuplicated(selects);

chrome.storage.local.get("languages").then(({languages})=>{
    sourceLang.querySelector(`[value=${languages.from}]`).selected = true;
    targetLang.querySelector(`[value=${languages.to}]`).selected = true;
})



