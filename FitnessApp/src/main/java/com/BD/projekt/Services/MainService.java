package com.BD.projekt.Services;

import com.BD.projekt.Entities.Klient;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;


abstract public class MainService {
    protected Connection conn;
    private final String dbname = "postgres";

    private final String user = "postgres";

    private final String pass = "admin";


    protected MainService(){
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/projekt?currentSchema=projekt" + dbname, user, pass);
            if (conn != null) {
                System.out.println("Connection Established");
            } else {
                System.out.println("Connection failed");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
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
