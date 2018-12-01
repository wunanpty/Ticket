package rpc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;

/**
 * Servlet implementation class Login
 */
@WebServlet("/login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
  //check if session is valid, if valid, return true
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBConnection connection = DBConnectionFactory.getConnection();
		try {
			//getSession(boolean create):
			//	Returns the current HttpSessionassociated with this request or, 
			//	if there is no current session and create is true, return a new session. 
			//	If create is falseand the request has no valid HttpSession,this method returns null. 
			HttpSession session = request.getSession(false);
			JSONObject obj = new JSONObject();
			
			if (session != null) {
				String userId = session.getAttribute("user_id").toString();
				obj.put("result", "SUCCESS").put("user_id", userId).put("name", connection.getFullname(userId));
			} else {
				response.setStatus(403);
				obj.put("result", "Invalid Session");
			}
			RpcHelper.writeJsonObject(response, obj);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			connection.close();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	//click login button, check if valid user, then create a new session, so write operation
	//first time login or previous session was already destroyed 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBConnection connection = DBConnectionFactory.getConnection();
		try {
			JSONObject input = RpcHelper.readJSONObject(request);
			String userId = input.getString("user_id");
			String password = input.getString("password");
			
			JSONObject obj = new JSONObject();
			if (connection.verifyLogin(userId, password)) {
				//create a session
				//getSession(): Returns the current session associated with this request,
				//				or if the request does not have a session, creates one.
				//in our case, in doPost, we use request does not have a session, creates one
				HttpSession session = request.getSession();
				session.setAttribute("user_id", userId);
				session.setMaxInactiveInterval(600); //600 seconds = 10min
				obj.put("result", "SUCCESS").put("user_id", userId).put("name", connection.getFullname(userId));
			} else {
				response.setStatus(401);
				obj.put("result", "User Doesn't Exist");
			}
			RpcHelper.writeJsonObject(response, obj);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			connection.close();
		}
	}

}
