const fileInput = document.getElementById('thumbnail');
const previewImage = document.getElementById('preview-image');
const closeThumbnail = document.getElementById('close-thumbnail')

fileInput.addEventListener('change', event => {
    if(event.target.files.length){
        previewImage.src = URL.createObjectURL(event.target.files[0])
        previewImage.setAttribute("class", "img-thumbnail d-flex")
    }
});

closeThumbnail.addEventListener('click', ()=>{
    fileInput.value = ""
    previewImage.src = ""
    previewImage.setAttribute("class", "img-thumbnail d-none")
})