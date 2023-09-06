package com.seb_45_main_021.unkwon.heart.entity;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;
}
