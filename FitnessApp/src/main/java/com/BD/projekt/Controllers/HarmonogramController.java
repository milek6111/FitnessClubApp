package com.BD.projekt.Controllers;

import com.BD.projekt.Services.ZajeciaService;
import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/harmonogram")
@CrossOrigin
public class HarmonogramController {
    private ZajeciaService service = new ZajeciaService();

    @GetMapping("/getAll")
    public List<Object> getAllClasses(){ return service.getAllClasses().toList();}

    @GetMapping("/thisWeek")
    public List<Object> getThisWeek(){ return service.getThisWeek().toList();}

    @GetMapping("/thisWeekFromClub")
    public List<Object> getClubThisWeek(@RequestParam int id){ return service.getClubThisWeek(id).toList();}

    @PostMapping("/save")
    public String saveDateTime(@RequestBody JsonNode object) { return service.saveDateTime(object); }
}
