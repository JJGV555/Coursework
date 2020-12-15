package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("dinfo/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class dinfo {
    @GET
    @Path("list/{Name}")
    public String driverlist(@PathParam("Name") String Name) {
        System.out.println("invoked user.dinfo");
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Drivers WHERE Name = ?");
            ps.setString(1, Name);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            while (results.next() == true) {
                response.put("Name", results.getString(3));
                response.put("Nationality", results.getString(4));
                response.put("FirstYear", results.getInt(5));
                response.put("LastYear", results.getInt(6));
                response.put("RaceStarts", results.getInt(7));
                response.put("Points", results.getInt(8));
                response.put("Wins", results.getInt(9));
                response.put("Poles", results.getInt(10));
                response.put("Podiums", results.getInt(11));
                response.put("BestQuali", results.getString(12));
                response.put("BestResult", results.getString(13));
                response.put("DNFs", results.getInt(14));
                response.put("DNQs", results.getInt(15));
                response.put("DSQs", results.getInt(16));
                response.put("BestChampPos", results.getString(17));
                response.put("ChampionshipNo", results.getInt(18));
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list stats. error code xx.\"}";
        }
    }
}
