package com.BD.projekt.Controllers;

import com.BD.projekt.Services.ZajeciaService;
import org.json.JSONArray;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
