<?php
   require_once('SMTP.php');
   require_once('Exception.php');
   require_once('PHPMailer.php');

   use PHPMailer\PHPMailer\PHPMailer;

   if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
       header('HTTP/1.0 404 Not Found');
       exit();
   }

   $mail = new PHPMailer();
   $mail->isSMTP();
   $mail->Host = 'sandbox.smtp.mailtrap.io';
   $mail->SMTPAuth = true;
   $mail->Port = 2525;
   $mail->Username = '35159d57085c8e';
   $mail->Password = 'ca07976004eb60';

//   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('uk', 'phpmailer/language/');
   $mail->IsHTML();

   //От кого письмо

   $mail->setFrom('info@docukraine.com.ua', 'Сайт ДОКУМЕНТИ УКРАЇНА');

//Кому отправить
   $mail->addAddress('info@docukraine.com.ua');
   $mail->addAddress('test@test.loc');
//Тема письма
   $mail->Subject = 'Сайт ДОКУМЕНТИ УКРАЇНА';

   //Тело письма
   $body = '<h1>Нове звернення через сайт ДОКУМЕНТИ УКРАЇНА!</h1>';

   if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Ім\'я:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['email']))){
    $body.='<p><strong>e-mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
   }
   if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Повідомлення:</strong> '.$_POST['message'].'</p>';
   }
   if(trim(!empty($_POST['formId']))){
       $body.='<p><strong>ID форми:</strong> '.$_POST['formId'].'</p>';
   }

   //Прикрепить файл
    if (!empty($_FILES['image']['tmp_name'])) {
        // Путь для збереження файлу
        $file = $_FILES['image']['name'];
        $originalName = pathinfo($file, PATHINFO_FILENAME);
        $ext = pathinfo($file, PATHINFO_EXTENSION);

        // Формуємо нову назву файлу
        $newFileName = $originalName . time() . '.' . $ext;

        $filePath = __DIR__ . "\\..\\..\\files\\" . $newFileName;

        // Завантажуємо файл
        if (copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body .= '<p><strong>Фото у додатку</strong>';
            $mail->addAttachment($fileAttach);
        }
    }

   $mail->Body = $body;

   //отправляем
   if (!$mail->send()) {
       $message = 'Помилка';
   } else {
       $message = 'Форма надіслана!';
   }

   $response = ['message' => $message];

   header('Content-type: application/json');
   echo json_encode($response);
