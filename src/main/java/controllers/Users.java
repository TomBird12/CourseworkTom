package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("users/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Users{
    @GET
    @Path("get/{UserID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String Get(@PathParam("UserID") Integer UserID) {
        System.out.println("Invoked Users.Get() with UserID " + UserID);
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserName, Password, Level, Coins, HighScore, LoginToken, Colour1, Colour2, Speedstat, Healthstat, Shieldstat, Settings1, Settings2, Settings3, Settings4 FROM Users WHERE UserID = ?");
            ps.setInt(1, UserID);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            if (results.next()== true) {
                response.put("UserID", UserID);
                response.put("UserName", results.getString(1));
                response.put("Password", results.getString(2));
                response.put("Level", results.getInt(3));
                response.put("Coins", results.getInt(4));
                response.put("HighScore", results.getInt(5));
                response.put("LoginToken", results.getString(6));
                response.put("Colour1", results.getString(7));
                response.put("Colour2", results.getString(8));
                response.put("Speedstat", results.getInt(9));
                response.put("Healthstat", results.getInt(10));
                response.put("Shieldstat", results.getInt(11));
                response.put("Settings1", results.getString(12));
                response.put("Settings2", results.getInt(13));
                response.put("Settings3", results.getString(14));
                response.put("Settings4", results.getInt(15));
            }
            else{
                System.out.println("Error: Invalid UserID");
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("update")
    public String Save(@FormDataParam("UserID") Integer UserID, @FormDataParam("UserName") String UserName, @FormDataParam("Password") String Password, @FormDataParam("Level") Integer Level, @FormDataParam("Coins") Integer Coins, @FormDataParam("HighScore") Integer HighScore, @FormDataParam("LoginToken") String LoginToken, @FormDataParam("Colour1") String Colour1, @FormDataParam("Colour2") String Colour2, @FormDataParam("Speedstat") Integer Speedstat, @FormDataParam("Healthstat") Integer Healthstat, @FormDataParam("Shieldstat") Integer Shieldstat, @FormDataParam("Settings1") String Settings1, @FormDataParam("Settings2") Integer Settings2, @FormDataParam("Settings3") String Settings3, @FormDataParam("Settings4") String Settings4) {
        try {
            System.out.println("Invoked Users.UpdateUsers/update UserID=" + UserID);
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Users SET UserName = ? , Password = ? , Level = ? , Coins = ? , HighScore = ? , LoginToken = ? , Colour1 = ? , Colour2 = ? , Speedstat = ? , Healthstat = ? , Shieldstat = ? , Settings1 = ? , Settings2 = ? , Settings3 = ? , Settings4 = ? WHERE UserID = ?");
            ps.setString(1, UserName);
            ps.setInt(2, UserID);
            ps.execute();
            return "{\"OK\": \"Users updated\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to update item, please see server console for more info.\"}";
        }
    }


}
