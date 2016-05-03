<?php
  function died($error) {
      echo "I am very sorry, but there were error(s) found with the form you submitted. ";
      echo $error."<br /><br />";
      echo "Please go back and fix these errors.<br /><br />";
      die();
  }

  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

  if(!isset($_POST['Name']) ||
      !isset($_POST['Email']) ||
      !isset($_POST['Subject']) ||
      !isset($_POST['Message'])) {
    died('I am sorry, but there appears to be a problem with the form you submitted.');
  }

  $email_to = "mattparks5855@gmail.com";
  $name = Trim(stripslashes($_POST['Name']));
  $email_from = Trim(stripslashes($_POST['Email']));
  $subject = "Mattparks Contact: " . Trim(stripslashes($_POST['Subject']));
  $message = Trim(stripslashes($_POST['Message']));

  $error_message = "";

  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }

  $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$name)) {
    $error_message .= 'The Name you entered does not appear to be valid.<br />';
  }

  if(strlen($subject) < 2) {
    $error_message .= 'The Subject you entered do not appear to be valid.<br />';
  }

  if(strlen($message) < 2) {
    $error_message .= 'The Message you entered do not appear to be valid.<br />';
  }

  if(strlen($error_message) > 0) {
    died($error_message);
  }

  $email_message = "Form details below.\n\n";
  $email_message .= "Name: ".clean_string($name)."\n";
  $email_message .= "Email: ".clean_string($email_from)."\n";
  $email_message .= "Subject: ".clean_string($subject)."\n";
  $email_message .= "Message: ".clean_string($message)."\n";

  $headers = 'From: '.$email_from."\r\n". 'Reply-To: '.$email_from."\r\n" . 'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $subject, $email_message, $headers);
?>
