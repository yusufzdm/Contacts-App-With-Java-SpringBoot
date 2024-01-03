package com.example.rehber.repository;

import com.example.rehber.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepo extends JpaRepository<PersonEntity,String> {

}
