package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Klub;
import com.BD.projekt.Services.KlubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kluby")
@CrossOrigin("*")
public class KlubController {
    @Autowired
    private KlubService service = new KlubService();
    @GetMapping("/listAll")
    public List<Klub> getClubs(){
        return service.getClubs();
    }

    @PostMapping("/save")
    public String saveClub(@RequestBody Klub klub){ return service.saveClub(klub);}
}
