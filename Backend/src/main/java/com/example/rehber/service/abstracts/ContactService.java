package com.example.rehber.service.abstracts;

import com.example.rehber.model.Person;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContactService {
    public Person save(Person p);
    public Person getPersonById(String id);
    public List<Person> listAllPersons();
    public String deleteById(String id);
    public Person updatePersonBy(Person p);
}
