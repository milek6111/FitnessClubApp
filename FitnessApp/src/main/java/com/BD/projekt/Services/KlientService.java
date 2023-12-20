package com.BD.projekt.Services;


import com.BD.projekt.Entities.Klient;
import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class KlientService extends MainService {

    public KlientService(){
        super();
    }

    public int getLastId(){
        ResultSet res = super.gueryExecutor("Select * from projekt.klient order by 1 DESC limit 1");
        int temp = -1;
        try{

            while(res.next()) {
                temp = res.getInt("id_klient");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return temp;
    }

    public int getLastKarnetId(){
        ResultSet res = super.gueryExecutor("Select * from projekt.karnety order by 1 DESC limit 1");
        int temp = -1;
        try{

            while(res.next()) {
                temp = res.getInt("id_karnet");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return temp;
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

    public JSONArray getMembershipInfo(int id){
        String sql = "select kb.nazwa, kt.data_zakupu, kt.data_waznosci, kt.oplata from projekt.klient kl join projekt.karnety kt on kl.id_klient = kt.id_klient\n" +
                "join projekt.Klub kb on kt.id_klub = kb.id_klub where kl.id_klient = " + id;


        JSONObject jo;
        JSONArray ja = new JSONArray();

        ResultSet res = super.gueryExecutor(sql);
        try{
            while(res.next()){
                jo = new JSONObject();
                jo.put("nazwa", res.getString("nazwa"));
                jo.put("data_zakupu", res.getString("data_zakupu"));
                jo.put("data_waznosci", res.getString("data_waznosci"));
                jo.put("oplata", res.getInt("oplata"));
                ja.put(jo);
            }
        } catch(Exception e){
            System.out.println(e);
        }

        //System.out.println(ja);
        return ja;
    }

    public String saveKlient(Klient klient){
        //TODO
        int id = getLastId() + 1;
        if(klient.getImie().length() == 0)
            return "Nie podano imienia";

        if(klient.getNazwisko().length() == 0)
            return "Nie podano nazwiska";

        if(klient.getData_urodzenia() == null)
            return "Nie podano daty urodzenia";

        if(klient.getData_urodzenia().plusYears(16).compareTo(LocalDate.now()) >= 0)
            return "Wiek poniżej 16 lat";

        if(klient.getTelefon().length() != 9)
            return "Niepoprawny numer telefonu";

        String sql = "INSERT INTO projekt.klient(id_klient, imie, nazwisko, data_urodzenia, telefon) VALUES(?,?,?,?,?)";

        int affectedRows = 0;

        try{
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1,id);
            pstmt.setString(2,klient.getImie());
            pstmt.setString(3,klient.getNazwisko());
            pstmt.setDate(4, Date.valueOf(klient.getData_urodzenia()));
            pstmt.setString(5,klient.getTelefon());

            affectedRows = pstmt.executeUpdate();

        }catch(Exception e){
            System.out.println(e);
        }

        System.out.println(affectedRows);

        return "OK";
    }

    public String setNewMembership(JsonNode node){
        int clientID = node.get("id_klient").asInt();
        int days = node.get("days").asInt();
        int clubID = node.get("id_klub").asInt();

        String sql = "select kl.id_klient, data_zakupu, data_waznosci from projekt.klient kl join projekt.karnety ka on kl.id_klient = ka.id_klient \n" +
                "where kl.id_klient = " + clientID + " and ka.id_klub = " + clubID;

        String insertsql = "INSERT INTO projekt.karnety(id_karnet, id_klient, id_klub, data_zakupu, data_waznosci, oplata) VALUES(?,?,?,?,?,?)";

        ResultSet res = super.gueryExecutor(sql);
        LocalDate end = LocalDate.MIN;
        LocalDate start;
        try{
            while(res.next()) {
                if(res.getDate("data_waznosci").toLocalDate().compareTo(end) > 0)
                    end = res.getDate("data_waznosci").toLocalDate();
            }
        } catch(Exception e){
            System.out.println(e);
        }

        System.out.println(end);

        if(LocalDate.now().compareTo(end) <= 0) {
            start = end;
        }
        else {
            start = LocalDate.now();
        }

        int cost;

        if(days == 360) cost = 450;
        else if(days == 120) cost = 200;
        else cost = 100;


        int karnetID = getLastKarnetId() + 1;

        int affectedRows = 0;

        try{
            PreparedStatement pstmt = conn.prepareStatement(insertsql);
            pstmt.setInt(1,karnetID);
            pstmt.setInt(2,clientID);
            pstmt.setInt(3,clubID);
            pstmt.setDate(4, Date.valueOf(LocalDate.now()));
            pstmt.setDate(5, Date.valueOf(start.plusDays(days)));
            pstmt.setInt(6,cost);

            affectedRows = pstmt.executeUpdate();

        }catch(Exception e){
            System.out.println(e);
        }

        System.out.println(affectedRows);


        return "OK";
    }


//    public Klient getKlientById(int id){
//        return null;
//    }


}
