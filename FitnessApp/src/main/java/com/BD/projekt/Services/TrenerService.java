package com.BD.projekt.Services;


import com.BD.projekt.Entities.Klient;
import com.BD.projekt.Entities.Trener;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrenerService extends MainService{
    public TrenerService(){
        super();
    }

    public List<Trener> getTrainers(){
        List<Trener> temp = new ArrayList<>();

        ResultSet res = super.gueryExecutor("Select * from projekt.Trener");
        try{
            while(res.next()) {
                temp.add(new Trener(res.getInt("id_trener"), res.getInt("id_klub"), res.getString("imie"), res.getString("nazwisko"), res.getDate("data_urodzenia").toLocalDate(), res.getString("telefon")));
            }
        } catch(Exception e){
            System.out.println(e);
        }

        return temp;
    }
}
