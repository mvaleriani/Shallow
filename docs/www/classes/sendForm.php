<?php 
    $info = (array) $_POST;
    $body = "";
    foreach ($info as $key => $value) {
        if($key == "country") $value = $cuppa->dataBase->getColumn("cu_countries", "name", "id = ".$value);
        $body .= "<b>".ucfirst($key).":</b> ".$value."<br />";
    }

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From: onPixel <info@onpixel.co>' . "\r\n";
    
    $result = @mail("onpixelstudios@gmail.com", "Byond form info", $body, $headers);
    if($result) echo 1;
    else echo 0;
?>