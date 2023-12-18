package com.BD.projekt.Services;

import com.BD.projekt.Entities.Klient;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@Service
abstract public class MainService {
    protected Connection conn;
    private final String dbname = "postgres";

    private final String user = "postgres";

    private final String pass = "admin";


    protected MainService(){
        conn =  Connector.getInstance();
    }

    protected ResultSet gueryExecutor(String query){
        ResultSet temp = null;
        try {
            Statement st = conn.createStatement();
            temp = st.executeQuery(query);

        } catch (Exception e){
            System.out.println(e);
        }
        return temp;
    }

}
