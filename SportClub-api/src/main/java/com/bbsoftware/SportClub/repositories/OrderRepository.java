package com.bbsoftware.SportClub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbsoftware.SportClub.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}