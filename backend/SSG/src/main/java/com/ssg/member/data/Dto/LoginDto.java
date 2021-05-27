package com.ssg.member.data.Dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    private String loginId;
    private String loginPwd;
    private int grade;
}
