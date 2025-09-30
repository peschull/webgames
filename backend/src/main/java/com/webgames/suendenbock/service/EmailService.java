package com.webgames.suendenbock.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${email.verification.from}")
    private String fromEmail;
    
    @Value("${email.verification.subject}")
    private String subject;
    
    @Value("${server.port:8080}")
    private String serverPort;
    
    @Async
    public void sendVerificationEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(buildVerificationEmailContent(token));
            
            mailSender.send(message);
            log.info("Verification email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", to, e);
        }
    }
    
    private String buildVerificationEmailContent(String token) {
        String verificationUrl = "http://localhost:" + serverPort + "/api/auth/verify-email?token=" + token;
        
        return "Willkommen bei Finde den Sündenbock!\n\n" +
                "Bitte verifiziere deine E-Mail-Adresse, indem du auf den folgenden Link klickst:\n\n" +
                verificationUrl + "\n\n" +
                "Dieser Link ist 24 Stunden gültig.\n\n" +
                "Falls du dieses Konto nicht erstellt hast, ignoriere diese E-Mail.\n\n" +
                "Viele Grüße,\n" +
                "Das Sündenbock-Team";
    }
}
