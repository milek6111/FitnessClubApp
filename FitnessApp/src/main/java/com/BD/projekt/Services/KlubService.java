package com.BD.projekt.Services;


import com.BD.projekt.Entities.Klient;
import com.BD.projekt.Entities.Klub;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Service
public class KlubService extends MainService {
    public KlubService(){
        super();
    }

    public List<Klub> getClubs(){
        List<Klub> temp = new ArrayList<>();
        ResultSet res = super.gueryExecutor("Select * from projekt.Klub");
        try{
            while(res.next()) {
                temp.add(new Klub(res.getInt("id_klub"), res.getString("nazwa"), res.getString("miasto"), res.getString("telefon")));
            }
        } catch(Exception e){
            System.out.println(e);
        }

        return temp;
    }
}
