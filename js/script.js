"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const formIds = ['demoForm4', 'demoForm5', 'demoForm'];

    formIds.forEach(formId => {
        const form = document.getElementById(formId);

        form.addEventListener('submit', e => formSend(e, form));
    });

    async function formSend(e, form) {
        e.preventDefault();
        const activeFormId = form.getAttribute('id');

        let error = formValidate(form);

        let formImage = form.querySelector('input[type="file"]');

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);
        formData.append('formId', activeFormId)

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('phpmailer/src/mail_raschet.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Помилка');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заповніть обов\'язкові поля!');
        }
    }

    function formValidate(form) {
        let error = 0;
        const formId = form.getAttribute('id');
        let formReq = document.querySelectorAll('#' + formId + '>ul>li>label>._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    // Надання/забирання класу у батьків
    function formAddError(input) {
       input.parentElement.classList.add('_error');
       input.classList.add('_error');
    }

    function formRemoveError(input) {
       input.parentElement.classList.add('_error');
       input.classList.add('_error');
    }

    //Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    //Получаем инпут файл в переменную
    const formImage = document.getElementById('formImage');
    const formImage4 = document.getElementById('formImage4');
    const formImage5 = document.getElementById('formImage5');

    //Получаем див для превью в переменную
    const formPreview = document.getElementById('formPreview');

    //Слушаем изменения в инпут файле
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0], formImage.id);
    });

    formImage4.addEventListener('change', () => {
        uploadFile(formImage4.files[0], formImage4.id);
    });

    formImage5.addEventListener('change', () => {
        uploadFile(formImage5.files[0], formImage5.id);
    });

    function uploadFile(file, inputId) {
        //проверяем тип файла
        const mimes = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp'];

        if (!mimes.includes(file.type)) {
            const allowedMimes = mimes.map((value) => value.split('/').pop()).join(', ');
            alert('Дозволені тільки такі формати: ' + allowedMimes);
            formImage.value = '';
            return;
        }
        //проверяем размер файла
        const MB = 8;

        if (file.size > MB * 1024 * 1024) {
            formImage.value = '';
            alert('Файл має бути меньше '+ MB +' МБ.');
            return;
        }

        var reader = new FileReader();
        if (file.type !== 'application/pdf' && inputId === 'formImage') {
            reader.onload = function (e) {
                formPreview.innerHTML = `<img src="${ e.target.result }" alt="Фото">`;
            };
        }

        reader.onerror = function(e) {
            alert('Помилка');
        };

        reader.readAsDataURL(file);
    }
});