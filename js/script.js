"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            let response = await fetch('mail_raschet.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            }
        }
    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index  < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
        
        if (input.classList.contains('_email')){
            if  (emailTest(input)) {
                formAddError(input);
                error++;
            }
        }
       }
       return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    //Функция теста email
    //function emailTest(input) {
    //    return !/\w+([\.-?\w+)*@\w+([\/.-]?\w+)(\.\w{2,8})+$/.test(input.value);
    //}

    //Получаем инпут файл в переменную
    const formImage = document.getElementById('formImage');

    //Слушаем изменения в инпут файле
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
    
    function uploadFile(file) {
        //проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Дозволені тільки зображення.');
            formImage.value = '';
            return;
        }
        //проверяем размер файла
        if (file.size > 8 * 1024 * 1024) {
            alert('Файл має бути менше 8 МБ.');
            return;
        }
    }
});