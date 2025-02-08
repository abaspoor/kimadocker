package org.dit.wim.ase.footprint.controller;

import org.dit.wim.ase.footprint.DTO.AnswerSetDTO;
import org.dit.wim.ase.footprint.entity.Transportmodel;
import org.dit.wim.ase.footprint.model.TransportResponse;
import org.dit.wim.ase.footprint.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transportmethods")
public class Transportcontroller {
    private final UserServiceImpl userService;
    private final TransportServiceImpl transportService;
    private final AnswerserviceImpl answerService;
    //    private final ResulService
    public Transportcontroller(UserServiceImpl userService, TransportServiceImpl transportService, AnswerserviceImpl answerService) {
        this.userService = userService;
        this.transportService = transportService;
        this.answerService = answerService;
    }
    @GetMapping()
//    @CrossOrigin(origins = "*")
    public ResponseEntity<?> getAllTransportmethod() {
        List<TransportResponse> transportResponseList=transportService.getAllTransportmethod();
        if(transportResponseList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("message", "No transport Method found"));
        }else {
            return new ResponseEntity<>(transportResponseList,HttpStatus.OK);
        }
    }
    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createAnswer(@RequestBody TransportResponse transportResponse) {
        Map<String, String> response = transportService.setMethod(transportResponse);

        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }

//    @DeleteMapping("/delete/{id}")
//    public void deleteTransport(@PathVariable Integer id) {
//        transportService.deleteTransport(id);
//    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteTransport(@PathVariable Integer id) {
        Map<String, String> response = transportService.deleteTransport(id);

        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/cascade/{id}")
    public ResponseEntity<Map<String, String>> deleteTransportCascade(@PathVariable Integer id) {
        Map<String, String> response = transportService.deleteTransportCascade(id);

        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/keep-answers/{id}")
    public ResponseEntity<Map<String, String>> deleteTransportKeepAnswers(@PathVariable Integer id) {
        Map<String, String> response = transportService.deleteTransportAndKeepAnswers(id);

        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }



}
