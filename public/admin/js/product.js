//Change Status
const changeStatus = document.querySelectorAll('[button-change-status]')

if(changeStatus.length){

    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    console.log(path)

    changeStatus.forEach(button => {
        button.addEventListener("click", ()=>{
            const currentStatus = button.getAttribute("data-status")
            const currentId = button.getAttribute("data-id")
            const changeStatus = currentStatus === "active" ? "inactive" : "active"
            
            
            const action = `${path}/${changeStatus}/${currentId}?_method=PATCH`
            
            formChangeStatus.setAttribute("action", action)
            formChangeStatus.submit()
        })
    })
}