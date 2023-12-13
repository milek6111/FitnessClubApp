package com.BD.projekt.Controllers;

import com.BD.projekt.Services.TrenerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trenerzy")
public class TrenerController {
    private TrenerService service = new TrenerService();
}
