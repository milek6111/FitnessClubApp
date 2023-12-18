package com.BD.projekt.Services;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;

@Service
public class Connector {
    private static Connection conn;
    private static final String dbname = "postgres";

    private static final String user = "postgres";

    private static final String pass = "admin";

    public static Connection getInstance(){
        if(conn == null){
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
            return conn;
        }
        else{
            return conn;
        }
    }


}
