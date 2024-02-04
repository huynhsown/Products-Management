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
                url.searchParams.delete("keyword")
                url.searchParams.delete("page")
            }
            else{
                url.href = "http://localhost:3000/admin/products"
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

//Pagination

const paginationNumber = document.querySelectorAll("[page-number]")
if(paginationNumber.length){
    let url = new URL(window.location.href)
    let urlPage = parseInt(url.searchParams.get("page"))

    paginationNumber.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const number = button.getAttribute("page-number")
            if(number==='1'){
                url.searchParams.delete("page")
            }
            else if(number !=='-1' && number!='+1'){
                url.searchParams.set("page", number)
            }
            else if(number==='-1'){
                url.searchParams.set("page", -1+urlPage)
            }
            else{
                url.searchParams.set("page", 1+urlPage)
            }
            window.location.href = url
        })
    })
}