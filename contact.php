<?php
header('Content-Type: application/json; charset=utf-8');

// Configuration
$site_email = "contact@leprixdureve.com";
$site_name = "Le Prix du Rêve";

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupération des données
    $data = [
        'name' => htmlspecialchars(trim($_POST['name'] ?? '')),
        'email' => filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL),
        'subject' => htmlspecialchars(trim($_POST['subject'] ?? '')),
        'message' => htmlspecialchars(trim($_POST['message'] ?? ''))
    ];
    
    // Validation
    $errors = [];
    
    if (empty($data['name'])) {
        $errors['name'] = "Le nom est requis";
    }
    
    if (empty($data['email'])) {
        $errors['email'] = "L'email est requis";
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "L'email n'est pas valide";
    }
    
    if (empty($data['message'])) {
        $errors['message'] = "Le message est requis";
    }
    
    // Si pas d'erreurs, envoyer l'email
    if (empty($errors)) {
        // Construction de l'email
        $email_subject = $data['subject'] ?: "Nouveau message depuis le site";
        $email_body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a1a2e; color: #c5a572; padding: 20px; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #1a1a2e; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Le Prix du Rêve - Nouveau Message</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>De :</div>
                        <div>{$data['name']} &lt;{$data['email']}&gt;</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Sujet :</div>
                        <div>{$data['subject']}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Message :</div>
                        <div>{$data['message']}</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // En-têtes
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: ' . $data['name'] . ' <' . $data['email'] . '>',
            'Reply-To: ' . $data['email'],
            'X-Mailer: PHP/' . phpversion()
        ];
        
        // Envoi de l'email
        $mail_sent = mail($site_email, $email_subject, $email_body, implode("\r\n", $headers));
        
        if ($mail_sent) {
            echo json_encode([
                'success' => true,
                'message' => 'Message envoyé avec succès !'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'errors' => ['global' => 'Une erreur est survenue lors de l\'envoi du message.']
            ]);
        }
    } else {
        // Retour des erreurs
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
    }
} else {
    // Méthode non autorisée
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'errors' => ['global' => 'Méthode non autorisée']
    ]);
}