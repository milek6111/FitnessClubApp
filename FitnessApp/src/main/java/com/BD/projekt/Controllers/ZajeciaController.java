package com.BD.projekt.Controllers;


import com.BD.projekt.Services.ZajeciaService;
import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/zajecia")
@CrossOrigin
public class ZajeciaController {
    @Autowired
    private ZajeciaService service = new ZajeciaService();

    @GetMapping("/all")
    public List<Object> getAll(){ return service.getAllClasses().toList(); }

    @GetMapping("/allFromClub")
    public List<Object> getClubAll(@RequestParam int id){ return service.getClubAllClasses(id).toList(); }

    @GetMapping("/getAll")
    public List<Object> getAllClassesinfo(){ return service.getAllClassesInfo().toList(); }

    @GetMapping("/getAllFromClub")
    public List<Object> getClubAllClassesinfo(@RequestParam int id){ return service.getClubAllClassesInfo(id).toList(); }

    @PostMapping("/save")
    public String newClass(@RequestBody JsonNode object){ return service.addClass(object); }
}
