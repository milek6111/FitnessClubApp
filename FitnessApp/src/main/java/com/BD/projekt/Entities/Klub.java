package com.BD.projekt.Entities;

import java.time.LocalDate;

public class Klub {
    private int id_klub;
    private String nazwa;
    private String miasto;
    private String telefon;

    public Klub(int id_klub, String nazwa, String miasto, String telefon) {
        this.id_klub = id_klub;
        this.nazwa = nazwa;
        this.miasto = miasto;
        this.telefon = telefon;
    }

    public int getId_klub() {
        return id_klub;
    }

    public String getNazwa() {
        return nazwa;
    }

    public String getMiasto() {
        return miasto;
    }

    public String getTelefon() {
        return telefon;
    }
}
