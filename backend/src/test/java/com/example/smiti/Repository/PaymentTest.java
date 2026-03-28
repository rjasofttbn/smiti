package com.example.smiti.Repository;

import com.example.smiti.payment.repository.PaymentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PaymentTest {

    @Autowired
    private PaymentRepository paymentRepository;

    @Test
    void paymentTest() {

        var payments = paymentRepository.findActivePaymentsWithDetails();

        payments.forEach(p -> {
            System.out.println(
                    p.getId() + " | " +
                            p.getAmount() + " | " +
                            p.getStatus() + " | " +
                            p.getShareholderName()  + " | " +
                            p.getContactNo()
            );
        });

    }
}