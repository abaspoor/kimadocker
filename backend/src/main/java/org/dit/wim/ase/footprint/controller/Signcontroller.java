package org.dit.wim.ase.footprint.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Signcontroller {
    @RequestMapping("/signup")
    public String signup() {
        return "Signup Successful";
    }

}
