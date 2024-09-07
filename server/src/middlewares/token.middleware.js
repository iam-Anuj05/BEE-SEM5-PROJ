import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";


const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader && bearerHeader.startsWith("Bearer ")) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET_KEY);
    }

    return false;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};




const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const tokenDecoded = tokenDecode(req);

      if (!tokenDecoded) return responseHandler.unauthorize(res);

      const user = await userModel.findById(tokenDecoded.data);

      if (!user || (roles.length && !roles.includes(user.role))) {
        return responseHandler.unauthorize(res);
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      responseHandler.error(res); // or another appropriate response
    }
  };
};


export default { auth, tokenDecode };