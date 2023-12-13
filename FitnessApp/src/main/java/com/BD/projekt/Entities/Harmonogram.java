package com.BD.projekt.Entities;

import java.time.LocalDate;
import java.time.LocalTime;

public class Harmonogram {
    private int id_harmonogram;
    private int id_zajecia;
    private LocalDate data;
    private LocalTime start;
    private LocalTime end;

    public Harmonogram(int id_harmonogram, int id_zajecia, LocalDate data, LocalTime start, LocalTime end) {
        this.id_harmonogram = id_harmonogram;
        this.id_zajecia = id_zajecia;
        this.data = data;
        this.start = start;
        this.end = end;
    }

    public int getId_harmonogram() {
        return id_harmonogram;
    }

    public int getId_zajecia() {
        return id_zajecia;
    }

    public LocalDate getData() {
        return data;
    }

    public LocalTime getStart() {
        return start;
    }

    public LocalTime getEnd() {
        return end;
    }
}
