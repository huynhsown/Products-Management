//Change Status
const changeStatus = document.querySelectorAll('[button-change-status]')

if(changeStatus.length){

    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")

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

//CheckBox Product
const checkBoxMulti = document.querySelector("[checkbox-multi]")
if(checkBoxMulti){
    const inputCheckAll = checkBoxMulti.querySelector('input[name="checkall"]')
    const inputCheckBoxes= checkBoxMulti.querySelectorAll('input[name="id"]')
    inputCheckAll.addEventListener("click", () => {
        inputCheckBoxes.forEach(input => input.checked = inputCheckAll.checked)
    })
    inputCheckBoxes.forEach(input => {
        input.addEventListener("click", () => {
            const countInput = checkBoxMulti.querySelectorAll('input[name="id"]:checked').length
            inputCheckAll.checked = countInput === inputCheckBoxes.length
        })
    })
}
//End CheckBox Product

//Form Change Multi 
const formChangeMulti = document.querySelector('[form-change-multi]')
if(formChangeMulti){    
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputCheckBoxes = checkBoxMulti.querySelectorAll('input[name="id"]:checked')
        if(inputCheckBoxes.length){
            const ids = Array.from(inputCheckBoxes).map(input => input.value).join(', ')
            const inputIds = formChangeMulti.querySelector('input[name="ids"]')
            inputIds.value = ids
            console.log(inputIds.value)
            formChangeMulti.submit()
        }
        else{
            alert("Please pick one item!")
        }
    })
}
//End Form Change Multi 