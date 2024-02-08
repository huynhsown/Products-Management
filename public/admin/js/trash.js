//Restore Product
const allButtonRestore = document.querySelectorAll('[button-restore]')
if(allButtonRestore.length){
    const formStore = document.querySelector('#form-restore')
    const path = formStore.getAttribute('data-path')
    allButtonRestore.forEach(button => {
        button.addEventListener('click', ()=>{
            const isConfirm = confirm("Đồng ý khôi phục")
            if(!isConfirm) return
            const currentId = button.getAttribute('data-id')
            const action = `${path}/${currentId}?_method=PATCH`
            formStore.action = action
            formStore.submit()
        })
    })
}

//Permanent Delete
const allButtonPermanentDel = document.querySelectorAll('[button-permanent-delete]')
if(allButtonPermanentDel.length){
    const formPermanetDel = document.querySelector('#form-permanent-delete')
    const path = formPermanetDel.getAttribute('data-path')
    allButtonPermanentDel.forEach(button => {
        button.addEventListener('click', ()=>{
            const isConfirm = confirm("Đồng ý xóa vĩnh viễn")
            if(!isConfirm) return;
            const currentId = button.getAttribute('data-id')
            const action = `${path}/${currentId}?_method=DELETE`
            formPermanetDel.action = action
            formPermanetDel.submit()
        })
    })
}