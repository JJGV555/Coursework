package controllers;

import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("seainfo/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class seainfo {
    @GET
    @Path("list/{Season}")
    public String seasonlist(@PathParam("Season") int Season) {
        System.out.println("invoked user.seainfo");
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT Drivers.FullName, Teams.TeamName, Engines.Manufacturer, Engines.Configuration, Tyres.Manufacturer FROM DTLinks JOIN Drivers ON DTLinks.DriverID = Drivers.DriverID JOIN Teams ON DTLinks.TeamID = Teams.TeamID JOIN Engines ON DTLinks.EngineID = Engines.EngineID JOIN Tyres ON DTLinks.TyreID = Tyres.TyreID WHERE DTLinks.SeasonID = ?");
            ps.setInt(1, Season);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            while (results.next() == true) {
                response.put("FullName", results.getString(1));
                response.put("TeamName", results.getString(2));
                response.put("EManufacturer", results.getString(3));
                response.put("Configuration", results.getString(4));
                response.put("TManufacturer", results.getString(5));
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list stats. error code xx.\"}";
        }
    }
}
