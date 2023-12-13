package com.BD.projekt.Entities;

import java.time.LocalDate;

public class Trener {
    private int id_trener;
    private int id_klub;
    private String imie;
    private String nazwisko;
    private LocalDate data_urodzenia;
    private String telefon;

    public Trener(int id_trener, int id_klub, String imie, String nazwisko, LocalDate data_urodzenia, String telefon) {
        this.id_trener = id_trener;
        this.id_klub = id_klub;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.data_urodzenia = data_urodzenia;
        this.telefon = telefon;
    }

    public int getId_trener() {
        return id_trener;
    }

    public int getId_klub() {
        return id_klub;
    }

    public String getImie() {
        return imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public LocalDate getData_urodzenia() {
        return data_urodzenia;
    }

    public String getTelefon() {
        return telefon;
    }
}
