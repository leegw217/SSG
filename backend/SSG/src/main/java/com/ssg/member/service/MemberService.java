package com.ssg.member.service;

import com.ssg.member.data.Authority;
import com.ssg.member.data.Dto.LoginDto;
import com.ssg.member.data.Dto.MemberResponse;
import com.ssg.member.data.Member;
import com.ssg.member.data.Dto.MemberDto;
import com.ssg.member.data.MemberRepository;
import com.ssg.member.jwt.JwtFilter;
import com.ssg.member.jwt.TokenProvider;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    String secret = "aW5jc3NhZnkxQCM0";
    private Key keySpec;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) throws UnsupportedEncodingException {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;

        byte[] keyBytes = new byte[16];
        byte[] b = secret.getBytes("UTF-8");
        int len = b.length;
        if (len > keyBytes.length) len = keyBytes.length;
        System.arraycopy(b, 0, keyBytes, 0, len);
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
        this.keySpec = keySpec;
    }

    @Transactional
    public String encrypt(String str) throws Exception {
        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(secret.getBytes()));
        byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
        String enStr = new String(Base64.encodeBase64(encrypted));
        return enStr;
    }

    @Transactional
    public String decrypt(String str) throws Exception {
        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(secret.getBytes()));
        byte[] byteStr = Base64.decodeBase64(str.getBytes());
        return new String(c.doFinal(byteStr), "UTF-8");
    }

    @Transactional
    public MemberResponse getMemberResponse(Member member) throws Exception {
        MemberResponse mr = MemberResponse.builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .nickname(member.getNickname())
                .phone(decrypt(member.getPhone()))
                .birth(decrypt(member.getBirth()))
                .build();
        return mr;
    }

    @Transactional
    public HttpHeaders login(LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getLoginPwd());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Member member = memberRepository.findByLoginId(loginDto.getLoginId());

        String jwt = tokenProvider.createToken(authentication, member);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return httpHeaders;
    }

    @Transactional
    public Member signup(MemberDto memberDto) throws Exception {
        if (memberRepository.findOneWithAuthoritiesByLoginId(memberDto.getLoginId()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        Member member = Member.builder()
                .loginId(memberDto.getLoginId())
                .loginPwd(passwordEncoder.encode(memberDto.getLoginPwd()))
                .nickname(memberDto.getNickname())
                .phone(encrypt(memberDto.getPhone()))
                .birth(encrypt(memberDto.getBirth()))
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public Optional<Member> getUserWithAuthorities(String loginId) {
        return memberRepository.findOneWithAuthoritiesByLoginId(loginId);
    }

//    @Transactional(readOnly = true)
//    public Optional<Member> getMyUserWithAuthorities() {
//        return userRepository.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername);
//    }

    // 회원정보 조회
    @Transactional
    public Member getMember(String loginId) {
        return memberRepository.findByLoginId(loginId);
    }

    // ID 중복 체크
    @Transactional
    public String checkId(String loginId) {
        if(memberRepository.findByLoginId(loginId) == null) return "success";
        else return "fail";
    }

    // 폰번호 중복 체크
    @Transactional
    public String checkPhone(String phone) throws Exception {
        if (memberRepository.findByPhone(encrypt(phone)) == null) return "success";
        else return "fail";
    }
}