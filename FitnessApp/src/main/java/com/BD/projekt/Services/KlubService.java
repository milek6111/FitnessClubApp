package com.BD.projekt.Services;


import com.BD.projekt.Entities.Klient;
import com.BD.projekt.Entities.Klub;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.beans.ExceptionListener;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Service
public class KlubService extends MainService {
    public KlubService(){
        super();
    }

    public int getLastId(){
        ResultSet res = super.gueryExecutor("Select * from projekt.Klub order by 1 DESC limit 1");
        int temp = -1;
        try{

            while(res.next()) {
                temp = res.getInt("id_klub");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return temp;
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

    public String saveClub(Klub klub){

        if(klub.getTelefon().length() != 9){
            return "Niepoprawny numer";
        }

        int id = getLastId() + 1;

        String sql = "INSERT INTO projekt.klub(id_klub, nazwa, miasto, telefon) VALUES(?,?,?,?)";

        int affectedRows = 0;

        try{
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1,id);
            pstmt.setString(2,klub.getNazwa());
            pstmt.setString(3,klub.getMiasto());
            pstmt.setString(4,klub.getTelefon());

            affectedRows = pstmt.executeUpdate();

        }catch(Exception e){
            System.out.println(e);
        }

        return "Liczba dodanych rekordów:" + affectedRows;

    }

    public String moreInfo(int id){
        String sql = "SELECT\n" +
                "    Klub.nazwa AS nazwa, " +
                "    Klub.miasto AS miasto, " +
                "    Klub.telefon AS telefon, " +
                "    COUNT(DISTINCT Karnety.id_klient) AS liczba_klientow, " +
                "    COUNT(DISTINCT Trener.id_trener) AS liczba_trenerow " +
                "FROM projekt.Klub " +
                "LEFT JOIN projekt.Karnety ON Klub.id_klub = Karnety.id_klub " +
                "LEFT JOIN projekt.Trener ON Klub.id_klub = Trener.id_klub " +
                "GROUP BY Klub.id_klub " +
                "having Klub.id_klub = "+id;


        StringBuilder temp = new StringBuilder("{ ");

        ResultSet res = super.gueryExecutor(sql);
        try{
            while(res.next()) {
                temp.append("nazwa:" + res.getString("nazwa") + ", miasto: " + res.getString("miasto") + ", telefon: " + res.getString("telefon") + ", liczba_klientow: " + res.getInt("liczba_klientow") + ", liczba_trenerow: " + res.getInt("liczba_trenerow"));
            }
            temp.append("}");
        } catch(Exception e){
            System.out.println(e);
        }

        return temp.toString();
    }
}
