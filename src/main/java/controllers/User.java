package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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
}
