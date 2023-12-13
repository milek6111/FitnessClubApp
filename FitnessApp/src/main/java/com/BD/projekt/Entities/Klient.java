package com.BD.projekt.Entities;

import java.time.LocalDate;

public class Klient {
    private int id_klient;
    private String imie;
    private String nazwisko;
    private LocalDate data_urodzenia;
    private String telefon;

    public Klient(int id_klient, String imie, String nazwisko, LocalDate data_urodzenia, String telefon) {
        this.id_klient = id_klient;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.data_urodzenia = data_urodzenia;
        this.telefon = telefon;
    }

    public int getId_klient() {
        return id_klient;
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
