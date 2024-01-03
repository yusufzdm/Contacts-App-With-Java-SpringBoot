package com.example.rehber.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_Person")
public class PersonEntity {
    @Id
    private String id;
    private String fName;
    private String lName;
    private String number;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getnumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

}
