/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import entity.Category;
import entity.Product;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.PathParam;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import session.CategoryFacade;

@Singleton
@Path("department")
public class DepartmentService {

    @EJB
    private CategoryFacade categoryFacade;
    
    public DepartmentService() {
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public JsonArray getDepartmentProducts(@PathParam("id")Short categoryId) {
        JsonArrayBuilder jb = Json.createArrayBuilder();
        Category selectedCategory = categoryFacade.find(categoryId);
        if (selectedCategory != null) {
            for (Product p : selectedCategory.getProductCollection()) {
                JsonObjectBuilder jpb = Json.createObjectBuilder().
                    add("id", p.getId()).
                    add("name", p.getName()).
                    add("price", p.getPrice());
                jb.add(jpb);
            }
        } 
        return jb.build();                
    }
            
}
