package org.dit.wim.ase.footprint.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResponse {
    private Integer Answer_id;
    private LocalDate Date;
    private LocalTime Time;
    private Integer  Distance;
    private Integer  Passenger_count;
    private String TransportMethodName;

}
