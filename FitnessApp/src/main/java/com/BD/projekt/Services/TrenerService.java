package com.BD.projekt.Services;


import com.BD.projekt.Entities.Klient;
import com.BD.projekt.Entities.Trener;
import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrenerService extends MainService{
    public TrenerService(){
        super();
    }

    public int getLastId(){
        ResultSet res = super.gueryExecutor("Select * from projekt.trener order by 1 DESC limit 1");
        int temp = -1;
        try{

            while(res.next()) {
                temp = res.getInt("id_trener");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return temp;
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

    public JSONArray getInfo(int id){
        //TODO

        String sql = "select kl.nazwa as knazwa, z.nazwa as znazwa from projekt.zajecia z join projekt.klub kl on z.id_klub = kl.id_klub where z.id_trener = " + id;

        JSONArray ja = new JSONArray();
        JSONObject jo = null;

        ResultSet res = super.gueryExecutor(sql);
        try{
            while(res.next()) {
                jo = new JSONObject();
                jo.put("klub",res.getString("knazwa"));
                jo.put("zajecia",res.getString("znazwa"));
                ja.put(jo);
            }
        } catch(Exception e){
            System.out.println(e);
        }



        //test dzialania
//        JSONArray ja = new JSONArray();
//        JSONObject jo = new JSONObject();
//        jo.put("klub","IronGym");
//        jo.put("zajecia","Plywanie");
//        ja.put(jo);


        return ja;
    }

    public String saveTrainer(Trener trener){
        String sql = "INSERT INTO projekt.Trener(id_trener, id_klub, imie, nazwisko, data_urodzenia, telefon) VALUES(?,?,?,?,?,?)";

        int id_trener = getLastId() + 1;

        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1,id_trener);
            ps.setInt(2,trener.getId_klub());
            ps.setString(3,trener.getImie());
            ps.setString(4,trener.getNazwisko());
            ps.setDate(5, Date.valueOf(trener.getData_urodzenia()));
            ps.setString(6,trener.getTelefon());

            int affectedRows =  ps.executeUpdate();
            //System.out.println(affectedRows);

        } catch (Exception e){
            System.out.println(e);
        }

        return "OK";
    }

}
