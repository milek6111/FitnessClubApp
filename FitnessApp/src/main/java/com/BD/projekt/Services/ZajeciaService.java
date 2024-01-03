package com.BD.projekt.Services;

import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;

@Service
public class ZajeciaService extends MainService{
    public ZajeciaService(){
        super();
    }

    public JSONArray getAllClasses(){
        String sql = "select za.nazwa as nazwa, kl.nazwa as klub, tr.imie as imie, tr.nazwisko as nazwisko, \n" +
                "ha.data as \"data\", ha.start as \"start\", ha.koniec as \"end\" from projekt.Harmonogram ha join\n" +
                "projekt.zajecia za on ha.id_zajecia = za.id_zajecia join\n" +
                "projekt.trener tr on tr.id_trener = za.id_trener join\n" +
                "projekt.klub kl on za.id_klub = kl.id_klub";
        ResultSet res = super.gueryExecutor(sql);

        JSONArray ja = new JSONArray();
        JSONObject jo = null;

        try{

            while(res.next()){
                jo = new JSONObject();
                jo.put("nazwa",res.getString("nazwa"));
                jo.put("klub", res.getString("klub"));
                jo.put("trener",res.getString("imie") + " " + res.getString("nazwisko"));
                jo.put("data",res.getDate("data"));
                jo.put("start", res.getTime("start"));
                jo.put("end", res.getTime("end"));
                ja.put(jo);
            }

        } catch(Exception e){
            System.out.println(e);
        }
        return ja;
    }

    public JSONArray getThisWeek(){

        LocalDate today = LocalDate.now();
        LocalDate monday = today;
        while(monday.getDayOfWeek() != DayOfWeek.MONDAY){
            monday = monday.minusDays(1);
        }
        LocalDate sunday = today;
        while(sunday.getDayOfWeek() != DayOfWeek.SUNDAY){
            sunday = sunday.plusDays(1);
        }

        String sql = "select za.nazwa as nazwa, kl.nazwa as klub, tr.imie as imie, tr.nazwisko as nazwisko, \n" +
                "ha.data as \"data\", ha.start as \"start\", ha.koniec as \"end\" from projekt.Harmonogram ha join\n" +
                "projekt.zajecia za on ha.id_zajecia = za.id_zajecia join\n" +
                "projekt.trener tr on tr.id_trener = za.id_trener join\n" +
                "projekt.klub kl on za.id_klub = kl.id_klub";
        ResultSet res = super.gueryExecutor(sql);

        JSONArray ja = new JSONArray();
        JSONObject jo = null;

        try{

            while(res.next()){
                LocalDate date = res.getDate("data").toLocalDate();
                if((date.isAfter(monday) || date.isEqual(monday)) &&(date.isBefore(sunday) || date.isEqual(sunday))) {
                    jo = new JSONObject();
                    jo.put("nazwa",res.getString("nazwa"));
                    jo.put("klub", res.getString("klub"));
                    jo.put("trener", res.getString("imie") + " " + res.getString("nazwisko"));
                    jo.put("data",res.getDate("data").toLocalDate().getDayOfWeek().getDisplayName(TextStyle.FULL,new Locale("pl","PL")));
                    jo.put("start", res.getTime("start"));
                    jo.put("end", res.getTime("end"));
                    ja.put(jo);
                }
            }

        } catch(Exception e){
            System.out.println(e);
        }
        return ja;
    }

    private int getLastClassId(){
        ResultSet res = super.gueryExecutor("Select * from projekt.zajecia order by 1 DESC limit 1");
        int temp = -1;
        try{

            while(res.next()) {
                temp = res.getInt("id_zajecia");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return temp;
    }

    public String addClass(JsonNode object){
        String sql = "INSERT INTO projekt.zajecia(id_zajecia,id_klub,id_trener,nazwa) VALUES(?,?,?,?)";

        int id = getLastClassId() + 1;

        try{
            int affectedRows;

            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1,id);
            ps.setInt(2,object.get("id_klub").asInt());
            ps.setInt(3,object.get("id_trener").asInt());
            ps.setString(4,object.get("nazwa").asText());

            affectedRows = ps.executeUpdate();

            System.out.println(affectedRows);

        } catch(Exception e){
            System.out.println(e);
        }



        return "OK";
    }

}
