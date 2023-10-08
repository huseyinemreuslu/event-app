// NotFoundPage.js

import React from "react";
import { Container, Alert } from "react-bootstrap";

function NotFoundPage() {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>404 Sayfa Bulunamadı</Alert.Heading>
        <p>
          Aradığınız sayfa bulunamadı. Lütfen doğru URL'yi kontrol edin veya ana
          sayfaya dönün.
        </p>
      </Alert>
    </Container>
  );
}

export default NotFoundPage;
