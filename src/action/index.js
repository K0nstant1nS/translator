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


selects.forEach(select=>{
    select.addEventListener("change", ()=>{
        setButtonEnabled(button)
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



