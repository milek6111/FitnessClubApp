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

    @PostMapping("/save")
    public String newClass(@RequestBody JsonNode object){ return service.addClass(object); }
}
