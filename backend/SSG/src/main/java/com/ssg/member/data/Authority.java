package com.ssg.member.data;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "authority")
@Getter
@AllArgsConstructor
@Builder
public class Authority {
    @Id
    private String authorityName;

    public Authority() {}
}