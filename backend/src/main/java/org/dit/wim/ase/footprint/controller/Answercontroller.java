package org.dit.wim.ase.footprint.controller;

import lombok.extern.log4j.Log4j2;
import org.dit.wim.ase.footprint.DTO.AnswerDTO;
import org.dit.wim.ase.footprint.DTO.AnswerSetDTO;
import org.dit.wim.ase.footprint.entity.Answermodel;
import org.dit.wim.ase.footprint.model.AnswerResponse;
import org.dit.wim.ase.footprint.service.AnswerService;
import org.dit.wim.ase.footprint.service.AnswerserviceImpl;
import org.dit.wim.ase.footprint.service.TransportService;
import org.dit.wim.ase.footprint.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/answers")
public class Answercontroller {
    private final UserService userService;
    private final TransportService transportService;
    private final AnswerserviceImpl answerService;

    public Answercontroller(UserService userService, TransportService transportService, AnswerserviceImpl answerService) {
        this.userService = userService;
        this.transportService = transportService;
        this.answerService = answerService;
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping()
    public ResponseEntity<List<AnswerResponse>> getAllAnswers(){
        List<AnswerResponse> answerResponseList= answerService.getAllAnswers();
        return new ResponseEntity<>(answerResponseList, HttpStatus.OK);
    }
    @GetMapping("/extra")
    public ResponseEntity<List<AnswerDTO>> getAllAnswersExtra(){
        List<AnswerDTO> answerDTOList = answerService.getAllAnswersExtra();
        return new ResponseEntity<>(answerDTOList,HttpStatus.OK);
    }

    @PostMapping("/set")
    public ResponseEntity<Map<String, String>> createAnswer(@RequestBody AnswerSetDTO answerDTO) {
        Map<String, String> response = answerService.setAnswer(answerDTO);

        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }



    @DeleteMapping("/delete/{id}")
    public void deleteanswer(@PathVariable int id) {
        answerService.deleteAnswer(id);
    }

}
