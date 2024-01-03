package com.BD.projekt.Controllers;

import com.BD.projekt.Entities.Trener;
import com.BD.projekt.Services.TrenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/More")
    public List<Object> getInfo(@RequestParam int id) {return service.getInfo(id).toList();}

    @PostMapping("/save")
    public String saveTrainer(@RequestBody Trener trener) {return service.saveTrainer(trener);}
}
