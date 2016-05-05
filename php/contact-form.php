<?php
  error_reporting(-1);
  ini_set('display_errors', 'On');
  set_error_handler("var_dump");

  $from = 'no-reply@mywebsite.com';
  $from_name = 'Mattparks Contact';
  $email_to = 'mattparks5855@gmail.com';
  $name = $_POST['Name'];
  $email_from = $_POST['Email'];
  $subject = '[Mattparks Contact] ' . $_POST['Subject'];
  $message = $_POST['Message'];

  $body  = "Name: " . $name . "\n";
  $body .= "Email: " . $email_from . "\n";
  $body .= "Subject: " . $subject . "\n" . "\n";
  $body .= $message . "\n";

  echo "Name: " . $name . "<br>";
  echo "Email: " . $email_from . "<br>";
  echo "Subject: " . $subject . "<br>";
  echo "<br>" . $message . "<br>";

  $sent = mail($email_to, $subject, $body, "From: " . $from_name . " <".$from.">", "-f $from -r " . $email_to);
  echo "<br>" . "Email Sent: ";
  echo ($sent) ? "True" : "False";
?>
