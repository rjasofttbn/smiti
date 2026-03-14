package com.example.smiti.shareholder.repository;

import com.example.smiti.shareholder.entity.Shareholder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShareholderRepository extends JpaRepository<Shareholder, Long> {

    List<Shareholder> findByDeletedAtIsNull();     // active
    List<Shareholder> findByDeletedAtIsNotNull();  // soft-deleted / trash
}