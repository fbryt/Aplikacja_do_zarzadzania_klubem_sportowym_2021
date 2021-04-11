package com.bbsoftware.SportClub.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Employee {

  private @Id @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY) Long id;
  private String firstName;
  private String lastName;
  private String role;
}