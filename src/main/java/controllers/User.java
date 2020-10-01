package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.UUID;

@Path("user/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class User {
    @GET
    @Path("listlatest")
    public String userList() {
        System.out.println("Invoked User.userList()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserID, username, password, email, sessiontoken FROM Users");
            ResultSet results = ps.executeQuery();
            while (results.next()==true){
                JSONObject row = new JSONObject();
                row.put("UserID", results.getInt(1));
                row.put("username", results.getString(2));
                row.put("password", results.getString(3));
                row.put("email", results.getString(4));
                row.put("sessiontoken", results.getString(5));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items. Error code xx.\"}";
        }
    }

    @POST
    @Path("attemptlogin")
    public String attemptloginUser(@FormDataParam("username") String username, @FormDataParam("password") String password) {
        System.out.println("Invoked attemptloginUser() on path user/attemptlogin");
        try {
            PreparedStatement ps1 = Main.db.prepareStatement("SELECT password FROM Users WHERE Username = ?");
            ps1.setString(1, username);
            ResultSet loginResults = ps1.executeQuery();
            if (loginResults.next() == true) {
                String correctPassword = loginResults.getString(1);
                if (password.equals(correctPassword)) {
                    String token = UUID.randomUUID().toString();
                    PreparedStatement ps2 = Main.db.prepareStatement("UPDATE Users SET sessiontoken = ? WHERE username = ?");
                    ps2.setString(1, token);
                    ps2.setString(2, username);
                    ps2.executeUpdate();
                    JSONObject userDetails = new JSONObject();
                    userDetails.put("username", username);
                    userDetails.put("token", token);
                    return userDetails.toString();
                } else {
                    return "{\"Error\": \"Incorrect password\"}";
                }
            } else {
                return "{\"Error\": \"username and password incorrect\"}";
            }
        } catch (Exception exception){
            System.out.println("Database error during /user/login: " + exception.getMessage());
            return "{\"Error\": \"Server side error\"}";
        }
    }

    public static boolean validtoken(String token) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserID FROM Users WHERE sessiontoken = ?");
            ps.setString(1, token);
            ResultSet logoutResults = ps.executeQuery();
            return logoutResults.next();
        } catch (Exception exception) {
            System.out.println("Database error" + exception.getMessage());
            return false;
        }
    }
}
