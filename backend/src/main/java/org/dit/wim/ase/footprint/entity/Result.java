package org.dit.wim.ase.footprint.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="Result")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Res_Id")
    private Integer Res_id;
    @Column(name="Co_Per_Day")
    private Integer CO_PER_DAY;
    @Column(name="Co_Per_Month")
    private Integer CO_PER_MONTH;
    @Column(name="Co_Per_Year")
    private Integer CO_PER_YEAR;
}
