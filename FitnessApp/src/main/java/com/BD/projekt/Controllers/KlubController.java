package com.BD.projekt.Controllers;

import com.BD.projekt.Services.KlubService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kluby")
public class KlubController {
    private KlubService service = new KlubService();
}
