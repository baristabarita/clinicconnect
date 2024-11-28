package com.clinicconnect.api.dto;

public class UserDTO {
    private String email;
    private String fname;
    private String lname;
    private String mname;
    private String userType;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }
    
    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }
    
    public String getMname() { return mname; }
    public void setMname(String mname) { this.mname = mname; }
    
    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
}
