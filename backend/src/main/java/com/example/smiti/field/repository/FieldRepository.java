package com.example.smiti.field.repository;

import com.example.smiti.field.entity.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FieldRepository extends JpaRepository<Field, Long> {

    List<Field> findByDeletedAtIsNull();     // ✅ active fields

    List<Field> findByDeletedAtIsNotNull();  // ✅ trash
}