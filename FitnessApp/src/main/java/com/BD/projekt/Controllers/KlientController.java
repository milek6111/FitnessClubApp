package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Klient;
import com.BD.projekt.Services.KlientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/klienci")
@CrossOrigin
public class KlientController{
    @Autowired
    private KlientService service = new KlientService();

    @GetMapping("/listAll")
    public List<Klient> getKlients(){
        return service.getKlients();
    }
}
