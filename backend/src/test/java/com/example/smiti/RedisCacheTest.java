//package com.example.smiti;
//
//import com.example.smiti.supplier.entity.Supplier;
//import com.example.smiti.supplier.service.SupplierService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class RedisCacheTest {
//
//    @Autowired
//    private SupplierService supplierService;
//
//    @Test
//    public void testSupplierCaching() {
//        Long supplierId = 2L;
//
//        System.out.println("=== First call (DB expected) ===");
//        Supplier first = supplierService.getById(supplierId);
//
//        System.out.println("=== Second call (Redis expected) ===");
//        Supplier second = supplierService.getById(supplierId);
//
//        System.out.println("=== Compare objects ===");
//        System.out.println("First == Second: " + (first == second));
//    }
//}