package org.example.backend.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String subject, String text);

}
