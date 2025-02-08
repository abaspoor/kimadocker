package org.dit.wim.ase.footprint.DTO;

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
public class AnswerSetDTO {
    private LocalDate date;
    private LocalTime time;
    private Integer  distance;
    private Integer  passenger_count;
    private Integer transportid;
    private Integer userid;
}