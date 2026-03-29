package com.example.smiti.payment.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface PaymentDTO {
    Long getId();
    Double getAmount();
    String getStatus();
    String getPaymentDate();

    @JsonProperty("shareholderName") // Forces JSON to be 'shareholderName'
    String getShareholderName();

    @JsonProperty("contactNo")       // Forces JSON to be 'contactNo'
    String getContactNo();
}