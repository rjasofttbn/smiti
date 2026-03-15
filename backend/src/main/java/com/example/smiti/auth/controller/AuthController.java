package com.example.smiti.auth.controller;

import com.example.smiti.auth.dto.LoginRequestDto;
import com.example.smiti.auth.dto.LoginResponseDto;
import org.springframework.web.bind.annotation.*;
import com.example.smiti.auth.entity.User;
import com.example.smiti.auth.repository.UserRepository;
import com.example.smiti.auth.service.AuthService;
import com.example.smiti.common.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // allow requests from React dev server
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    // 1. You MUST declare the service here
    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // 1. Prepare passwords
        String rawPassword = user.getPassword();
        user.setClearPassword(rawPassword);
        user.setPassword(passwordEncoder.encode(rawPassword));

        // 2. CALL THE SERVICE (This handles token generation & email sending)
        authService.register(user);

        // 3. Return a response that includes the token for testing purposes
        String verificationLink = "http://localhost:6060/api/auth/verify?token=" + user.getVerificationToken();

        return ResponseEntity.ok("User Registered Successfully. Verification Link: " + verificationLink);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {

        System.out.println("DEBUG: Login attempt for email: " + request.getEmail());

        // 1. Find the user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    System.out.println("DEBUG: User not found in database.");
                    return new RuntimeException("User not found");
                });

        // 2. Check if enabled (Verification check)
        if (!user.isEnabled()) {
            System.out.println("DEBUG: User exists but is NOT enabled.");
            throw new RuntimeException("Please verify your email before logging in.");
        }

        // 3. Check password
        // If this fails, the password in your DB is likely NOT BCrypt hashed.
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("DEBUG: Password mismatch for user: " + request.getEmail());
            throw new RuntimeException("Invalid credentials");
        }

        // 4. If we reached here, login is successful!
        System.out.println("DEBUG: Login successful! Generating token...");
        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(new LoginResponseDto(token, user.getEmail(), user.getRole().name()));
    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
//        // 1. Find the user first
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // 2. NOW you can check if they are enabled
//        if (!user.isEnabled()) {
//            throw new RuntimeException("Please verify your email before logging in.");
//        }
//
//        // 3. Check password
//        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid credentials");
//        }
//
//        // 4. Generate token (Pass the whole user object as we configured before)
//        // AuthController.java -> Inside login method
//        String token = jwtService.generateToken(user.getEmail()); // Use .getEmail()
//
//        return ResponseEntity.ok(new LoginResponseDto(token, user.getEmail(), user.getRole().name()));
//    }


    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        // Now 'authService' will be resolved correctly
        return ResponseEntity.ok(authService.verifyToken(token));
    }
}
