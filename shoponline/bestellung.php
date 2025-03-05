<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $warenkorb = $_POST['warenkorb'];
    $gesamtpreis = $_POST['gesamtpreis'];

    // Hier könnte eine Verbindung zu einer echten Datenbank erfolgen
    // Aber wir speichern die Bestellung einfach in einer Textdatei
    $bestellung = [
        'warenkorb' => $warenkorb,
        'gesamtpreis' => $gesamtpreis,
        'bestelldatum' => date('Y-m-d H:i:s')
    ];

    file_put_contents('bestellungen.txt', json_encode($bestellung) . PHP_EOL, FILE_APPEND);

    echo 'Bestellung erfolgreich! Vielen Dank für Ihren Kauf.';
}
?>
