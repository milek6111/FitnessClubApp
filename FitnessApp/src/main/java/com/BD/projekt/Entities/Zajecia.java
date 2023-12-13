package com.BD.projekt.Entities;

public class Zajecia {
    private int id_zajecia;
    private int id_klub;
    private int id_trener;
    private String nazwa;

    public Zajecia(int id_zajecia, int id_klub, int id_trener, String nazwa) {
        this.id_zajecia = id_zajecia;
        this.id_klub = id_klub;
        this.id_trener = id_trener;
        this.nazwa = nazwa;
    }

    public int getId_zajecia() {
        return id_zajecia;
    }

    public int getId_klub() {
        return id_klub;
    }

    public int getId_trener() {
        return id_trener;
    }

    public String getNazwa() {
        return nazwa;
    }

}
