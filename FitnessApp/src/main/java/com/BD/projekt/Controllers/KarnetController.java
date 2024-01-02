package com.BD.projekt.Controllers;

import com.BD.projekt.Services.KlientService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/klienci/karnety")
@CrossOrigin
public class KarnetController {
    KlientService service = new KlientService();

    @GetMapping("/info")
    public List<Object> getMembershipInfo(@RequestParam int id) {return service.getMembershipInfo(id).toList();}

    @PostMapping("/save")
    public String setNewMembership(@RequestBody JsonNode node){ return service.setNewMembership(node);}
}
