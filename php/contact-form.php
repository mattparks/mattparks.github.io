<?php
  error_reporting(-1);
  ini_set('display_errors', 'On');
  set_error_handler("var_dump");

  $email_to = "mattparks5855@gmail.com";
  $name = Trim(stripslashes($_POST['Name']));
  $email_from = Trim(stripslashes($_POST['Email']));
  $subject = "Mattparks Contact: " . Trim(stripslashes($_POST['Subject']));
  $message = Trim(stripslashes($_POST['Message']));

  $body  = "Name: " . $name . "\n";
  $body .= "Email: " . $email_from . "\n";
  $body .= "Subject: " . $subject . "\n" . "\n";
  $body .= $message . "\n";
  echo $body;

  $headers  = "MIME-Version: 1.1" . PHP_EOL;
  $headers .= "Content-type: text/html; charset=utf-8" . PHP_EOL;
  $headers .= "Content-Transfer-Encoding: 8bit" . PHP_EOL;
  $headers .= "Date: " . date('r', $_SERVER['REQUEST_TIME']) . PHP_EOL;
  $headers .= "Message-ID: <" . $_SERVER['REQUEST_TIME'] . md5($_SERVER['REQUEST_TIME']) . '@' . $_SERVER['SERVER_NAME'] . '>' . PHP_EOL;
  $headers .= "From: " . "=?UTF-8?B?".base64_encode($name)."?=" . "<$email_from>" . PHP_EOL;
  $headers .= "Return-Path: $email_to" . PHP_EOL;
  $headers .= "Reply-To: $email_from" . PHP_EOL;
  $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;
  $headers .= "X-Originating-IP: " . $_SERVER['SERVER_ADDR'] . PHP_EOL;
  $sent = mail($email_to, "=?utf-8?B?".base64_encode($subject)."?=", $body, $headers);
  echo "Message sent correctly: ";
  echo ($sent) ? 'true' : 'false';
?>
