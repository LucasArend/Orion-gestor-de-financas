package com.t2.apiorion.user.dto;

public class ChangePasswordRequest {

    private String currentPassword;
    private String newPassword;

    // Getters e setters
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
