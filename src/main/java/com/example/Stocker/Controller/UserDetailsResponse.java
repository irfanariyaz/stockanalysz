package com.example.Stocker.Controller;

public class UserDetailsResponse {
    private String username;
    private byte[] imageData;

    public UserDetailsResponse(String username, byte[] imageData) {
        this.username = username;
        this.imageData = imageData;
    }
}
