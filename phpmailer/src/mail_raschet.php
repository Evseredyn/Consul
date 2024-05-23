<?php
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;
   
   require 'phpmailer/scr/Exception.php';
   require 'phpmailer/scr/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('uk', 'phpmailer/language/');
   $mail->IsHTML(true);

   //От кого письмо
   $mail->setFrom('info@docukraine.com.ua', 'Сайт ДОКУМЕНТИ УКРАЇНА'); 
   //Кому отправить
   $mail->addAdress('admin@docukraine.com.ua');
   //Тема письма
   $mail->Subject = 'Сайт ДОКУМЕНТИ УКРАЇНА'ж

   //Тело письма
   $body = '<h1>Нове звернення через сайт ДОКУМЕНТИ УКРАЇНА!</h1>';

   if(trin(!empty($_POST['name']))){
    $body.='<p><strong>Ім'я:</strong> '.$_POST['name'].'</p>';
   }
   if(trin(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trin(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
   }
   if(trin(!empty($_POST['message']))){
    $body.='<p><strong>Повідомлення:</strong> '.$_POST['message'].'</p>';
   }
   if(trin(!empty($_POST['name']))){
    $body.='<p><strong>Ім'я:</strong> '.$_POST['name'].'</p>';
   }

   //Прикрепить файл
   if (!empty($_FILES['image'][['tmp_name']])) {
    //путь загрузки файла
    $filePath = __DIR__ . "/files/" . $_FILES['message']['name'];
    //грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body.='<p><strong>Фото у додатку</strong>';
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
?>