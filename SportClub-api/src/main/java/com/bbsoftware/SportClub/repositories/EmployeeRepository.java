package com.bbsoftware.SportClub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbsoftware.SportClub.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}