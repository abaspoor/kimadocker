package org.dit.wim.ase.footprint.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Builder;

import java.util.List;

@Entity
@Table(name="Answermodel")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Answermodel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Answer_Id")
    private Integer Answer_id;
    @Column(name="DATE")
    private LocalDate Date;
    @Column(name="TIME")
    private LocalTime Time;
    @Column(name="DISTANCE")
    private Integer  Distance;
    @Column(name="Passenger_Count")
    private Integer  Passenger_count;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="AnswerByTransportId",referencedColumnName = "T_Id",nullable = true)
    private Transportmodel Transportmodel;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="AnswerByUserId", referencedColumnName = "User_Id",nullable = true)
    private UserProperty userproperty;
}
