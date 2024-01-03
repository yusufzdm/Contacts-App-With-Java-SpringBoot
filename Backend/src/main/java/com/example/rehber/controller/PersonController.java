package com.example.rehber.controller;

import com.example.rehber.model.Person;
import com.example.rehber.service.abstracts.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PersonController {
    @Autowired
    ContactService contactService;

    @PostMapping()
    public Person save(@RequestBody Person P){
        return contactService.save(P);
    }

    @GetMapping()
    public List<Person> listAllPerson(){
        return contactService.listAllPersons();
    }
    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable String id){
        return contactService.getPersonById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable String id){
        return contactService.deleteById(id);
    }
    @PutMapping()
    public Person updateThePerson(@RequestBody Person p){

        return  contactService.updatePersonBy(p);
    }
}
