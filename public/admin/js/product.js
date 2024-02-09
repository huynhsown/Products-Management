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
        const typeChange = e.target.elements.type.value
        if(typeChange === "recycledelete" || typeChange === "permanentdelete"){
            const isConfirm = confirm("Đồng ý xóa")
            if(!isConfirm) return
        }



        if(inputCheckBoxes.length){
            const ids = Array.from(inputCheckBoxes).map(input => {
                const position = input
                                    .closest('tr')
                                    .querySelector('input[name="position"]').value
                return `${input.value}-${position}`
            }).join(', ')
            const inputIds = formChangeMulti.querySelector('input[name="ids"]')
            inputIds.value = ids
            formChangeMulti.submit()
        }
        else{
            alert("Please pick one item!")
        }
    })
}
//End Form Change Multi 


//Delete Product

const allButtonDelete = document.querySelectorAll('[button-delete]')
if(allButtonDelete.length){
    const formDeleleProduct = document.querySelector("#form-delete-product")
    const path = formDeleleProduct.getAttribute('data-path')
    allButtonDelete.forEach(button => {
        button.addEventListener('click', ()=>{
            const isConfirm = confirm("Đồng ý xóa sản phẩm")
            if(!isConfirm) return
            const currentId = button.getAttribute("data-id")
            const action = `${path}/${currentId}?_method=DELETE`
            formDeleleProduct.setAttribute("action", action)
            formDeleleProduct.submit()
        })
    })
}

//Flash

const flashMessage = document.querySelector('[show-alert]')
if(flashMessage){
    const time = parseInt(flashMessage.getAttribute('data-time'))
    setTimeout(()=>{
        flashMessage.classList.add("alert-hidden")
    },time)
}