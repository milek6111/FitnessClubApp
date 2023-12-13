package com.BD.projekt.Entities;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public class Karnety {
    private int id_karnet;
    private int id_klient;
    private int id_klub;
    private LocalDate data_zakupu;
    private LocalDate data_waznosci;
    private int oplata;

    public Karnety(int id_karnet, int id_klient, int id_klub, LocalDate data_zakupu, LocalDate data_waznosci, int oplata) {
        this.id_karnet = id_karnet;
        this.id_klient = id_klient;
        this.id_klub = id_klub;
        this.data_zakupu = data_zakupu;
        this.data_waznosci = data_waznosci;
        this.oplata = oplata;
    }

    public int getId_karnet() {
        return id_karnet;
    }

    public int getId_klient() {
        return id_klient;
    }

    public int getId_klub() {
        return id_klub;
    }

    public LocalDate getData_zakupu() {
        return data_zakupu;
    }

    public LocalDate getData_waznosci() {
        return data_waznosci;
    }

    public int getOplata() {
        return oplata;
    }
}
