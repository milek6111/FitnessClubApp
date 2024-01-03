package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Klient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TestController {

    @GetMapping("/")
    public String hello(){
        return " ";
    }

}
