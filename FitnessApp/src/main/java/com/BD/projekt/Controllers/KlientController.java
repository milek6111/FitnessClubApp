package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Klient;
import com.BD.projekt.Services.KlientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/save")
    public String saveKlient(@RequestBody Klient klient) { return service.saveKlient(klient);}
}
