package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Trener;
import com.BD.projekt.Services.TrenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/trenerzy")
@CrossOrigin
public class TrenerController {
    @Autowired
    private TrenerService service = new TrenerService();
    @GetMapping("/listAll")
    public List<Trener> getTrainers(){
        return service.getTrainers();
    }
}
