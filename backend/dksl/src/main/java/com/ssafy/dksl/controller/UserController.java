package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.model.service.UserServiceImpl;
import com.ssafy.dksl.util.exception.RegisterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    private ResponseEntity<?> register(@RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok(userService.register(userDto));
        } catch (RegisterException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @PostMapping("login")
    private ResponseEntity<?> login(@RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok(userService.login(userDto));
        } catch (LoginException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }
}