//package com.example.smiti.Repository;
//
//import com.example.smiti.supplier.entity.Supplier;
//import com.example.smiti.supplier.repository.SupplierRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class SupplierTest {
//    @Autowired
//    SupplierRepository supplierRepository;
//
//    @Test
//    void supplierTest(){
//        var suppliers = supplierRepository.findAllByDeletedAtIsNull();
//        for (Supplier supplier : suppliers) {
//            System.out.println(supplier);
//        }
//    }
//}
