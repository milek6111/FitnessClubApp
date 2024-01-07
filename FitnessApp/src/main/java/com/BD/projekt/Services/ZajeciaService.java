package com.BD.projekt.Services;

import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
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

    public JSONArray getClubAllClasses(int id){
        String sql = "select za.nazwa as nazwa, kl.nazwa as klub, tr.imie as imie, tr.nazwisko as nazwisko, \n" +
                "ha.data as \"data\", ha.start as \"start\", ha.koniec as \"end\" from projekt.Harmonogram ha join\n" +
                "projekt.zajecia za on ha.id_zajecia = za.id_zajecia join\n" +
                "projekt.trener tr on tr.id_trener = za.id_trener join\n" +
                "projekt.klub kl on za.id_klub = kl.id_klub where kl.id_klub = " + id;
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

    public JSONArray getClubThisWeek(int id){

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
                "projekt.klub kl on za.id_klub = kl.id_klub where kl.id_klub = " + id;
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

    public JSONArray getAllClassesInfo(){
        String sql = "select distinct za.id_zajecia as id_zajecia, za.nazwa as nazwa,kl.id_klub as id_klub, kl.nazwa as klub,tr.id_trener as id_trener, tr.imie as imie, tr.nazwisko as nazwisko from projekt.zajecia za join " +
                "                projekt.trener tr on tr.id_trener = za.id_trener join " +
                "                projekt.klub kl on za.id_klub = kl.id_klub";
        ResultSet res = super.gueryExecutor(sql);

        JSONArray ja = new JSONArray();
        JSONObject jo = null;

        try{

            while(res.next()){
                jo = new JSONObject();
                jo.put("nazwa",res.getString("nazwa"));
                jo.put("id_klub",res.getInt("id_klub"));
                jo.put("id_trener",res.getInt("id_trener"));
                jo.put("klub", res.getString("klub"));
                jo.put("trener",res.getString("imie") + " " + res.getString("nazwisko"));
                jo.put("id_zajecia",res.getInt("id_zajecia"));
                ja.put(jo);
            }

        } catch(Exception e){
            System.out.println(e);
        }
        return ja;

    }

    public JSONArray getClubAllClassesInfo(int id){
        String sql = "select distinct za.id_zajecia as id_zajecia, za.nazwa as nazwa,kl.id_klub as id_klub, kl.nazwa as klub,tr.id_trener as id_trener, tr.imie as imie, tr.nazwisko as nazwisko from projekt.zajecia za join " +
                "                projekt.trener tr on tr.id_trener = za.id_trener join " +
                "                projekt.klub kl on za.id_klub = kl.id_klub where kl.id_klub = "+id;
        ResultSet res = super.gueryExecutor(sql);

        JSONArray ja = new JSONArray();
        JSONObject jo = null;

        try{

            while(res.next()){
                jo = new JSONObject();
                jo.put("nazwa",res.getString("nazwa"));
                jo.put("id_klub",res.getInt("id_klub"));
                jo.put("id_trener",res.getInt("id_trener"));
                jo.put("klub", res.getString("klub"));
                jo.put("trener",res.getString("imie") + " " + res.getString("nazwisko"));
                jo.put("id_zajecia",res.getInt("id_zajecia"));
                ja.put(jo);
            }

        } catch(Exception e){
            System.out.println(e);
        }
        return ja;

    }

    private int getLastHarmonogramId(){
        ResultSet res = super.gueryExecutor("Select * from projekt.harmonogram order by 1 DESC limit 1");
        int temp = -1;
        try{

            while(res.next()) {
                temp = res.getInt("id_harmonogram");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return temp;
    }

    public String saveDateTime(JsonNode object){
        int id_klub = object.get("id_klub").asInt();
        int id_zajecia = object.get("id_zajecia").asInt();
       //LocalDate data = LocalDate.parse(object.get("data").asText());
        LocalDate data = LocalDate.parse(object.get("data").asText().split("T")[0]).plusDays(1);
        Time time = Time.valueOf(object.get("chosenTime").asText());

        System.out.println(data +  " " + time);
        int id_harmonogram = getLastHarmonogramId() + 1;

        String sql = "Select count(*) as ct from projekt.harmonogram ha join projekt.zajecia za on ha.id_zajecia = za.id_zajecia where za.id_klub = " +id_klub +   " and \"data\" = ? "  + " and \"start\" = ?";
        int count = 0;

        try{
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setDate(1, Date.valueOf(data));
            ps.setTime(2,time);
            ResultSet rs = ps.executeQuery();
            while(rs.next())
                count = rs.getInt("ct");
        } catch (Exception e){
            System.out.println(e);
        }

        if(data.isBefore(LocalDate.now()) || data.equals(LocalDate.now())) return "Wybrano niepoprawną datę";

        if(count != 0) return "Termin zajety";


        sql = "INSERT INTO projekt.harmonogram(id_harmonogram, id_zajecia, data, start, koniec) VALUES(?,?,?,?,?)";

        try{
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1,id_harmonogram);
            ps.setInt(2,id_zajecia);
            ps.setDate(3,Date.valueOf(data));
            ps.setTime(4,time);
            ps.setTime(5,Time.valueOf(time.toLocalTime().plusHours(1).plusMinutes(30)));

            int affectedRows = ps.executeUpdate();
            System.out.println(affectedRows);
        } catch(Exception e){
            System.out.println(e);
        }

        return "OK";

    }

}
