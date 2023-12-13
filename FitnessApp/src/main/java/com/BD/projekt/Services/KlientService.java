package com.BD.projekt.Services;


import com.BD.projekt.Entities.Klient;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

public class KlientService extends MainService {

    public KlientService(){
        super();
    }

    public List<Klient> getKlients(){
        List<Klient> temp = new ArrayList<>();

        ResultSet res = super.gueryExecutor("Select * from projekt.klient");
        try{
            while(res.next()) {
                temp.add(new Klient(res.getInt("id_klient"), res.getString("imie"), res.getString("nazwisko"), res.getDate("data_urodzenia").toLocalDate(), res.getString("telefon")));
            }
        } catch(Exception e){
            System.out.println(e);
        }

        return temp;
    }

    public Klient getKlientById(int id){
        return null;
    }
}
