// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
   

   
    Query query = new Query("Comment");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
     ArrayList<String> tasks = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      String savedMessage = (String) entity.getProperty("message");
      tasks.add(savedMessage);
    }

    response.setContentType("application/json;");
    response.getWriter().println(convertToJson(tasks));
  }

  private String convertToJson(ArrayList<String> message) {
    String json = "";
    for (int i = 0; i < message.size(); i++) {
      json += "\n" + message.get(i);
    }
    return json;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String text = request.getParameter("user-ans");
  

    // Respond with the result.
    response.setContentType("text/html;");

    // creating an entity to keep track of comments
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("message", text);

    // Storing that entity in datastore to save comments from being lost
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // redirect to index html to see comments on page
    response.sendRedirect("/index.html");
  }
}
