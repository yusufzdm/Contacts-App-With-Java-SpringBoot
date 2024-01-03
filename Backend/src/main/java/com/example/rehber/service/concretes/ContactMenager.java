package com.example.rehber.service.concretes;

import com.example.rehber.entity.PersonEntity;
import com.example.rehber.model.Person;
import com.example.rehber.repository.PersonRepo;
import com.example.rehber.service.abstracts.ContactService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ContactMenager implements ContactService {

    @Autowired
    PersonRepo personRepo;

    @Override
    public Person save(Person P) {
        PersonEntity pEntity=new PersonEntity();
        if(P.getId()==null) {
            P.setId(UUID.randomUUID().toString());
        }
        BeanUtils.copyProperties(P,pEntity);
        personRepo.save(pEntity);
        return P;
    }

    @Override
    public Person getPersonById(String id) {
        Person p=new Person();
        PersonEntity personEntity=personRepo.findById(id).get();
        BeanUtils.copyProperties(personEntity,p);
        return p;
    }

    @Override
    public List<Person> listAllPersons() {
        List<PersonEntity> pEntList= personRepo.findAll();
        List<Person> pModList=new ArrayList<>();

        for(PersonEntity pEn:pEntList){
            Person p=new Person();
            BeanUtils.copyProperties(pEn,p);
            pModList.add(p);
        }

        return pModList;
    }

    @Override
    public String deleteById(String id) {


        personRepo.deleteById(id);

        return id+" is deleted";
    }

    @Override
    public Person updatePersonBy(Person p) {
        PersonEntity personEnt= personRepo.findById(p.getId()).get();
        BeanUtils.copyProperties(p,personEnt);
        personRepo.save(personEnt);
        return p;
    }


}
