package com.BD.projekt.Controllers;


import com.BD.projekt.Services.ZajeciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/zajecia")
public class ZajeciaController {
    @Autowired
    private ZajeciaService service = new ZajeciaService();

}
