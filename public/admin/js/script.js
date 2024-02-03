// console.log("OK")
// Button Status
const buttonStatus = document.querySelectorAll("[btn-status]")
if(buttonStatus.length){
    let url = new URL(window.location.href)

    buttonStatus.forEach(button => {
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("btn-status")
            
            if(status.length){
                url.searchParams.set("status", status)
            }
            else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}

//Form Search

const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)

    formSearch.addEventListener('submit', (e)=>{
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword", keyword)
        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url
    })
}