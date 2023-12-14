package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Klub;
import com.BD.projekt.Services.KlubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/kluby")
@CrossOrigin
public class KlubController {
    @Autowired
    private KlubService service = new KlubService();
    @GetMapping("/listAll")
    public List<Klub> getClubs(){
        return service.getClubs();
    }
}
