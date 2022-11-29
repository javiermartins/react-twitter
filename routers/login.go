package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/jwt"
	"github.com/javiermartins/react-twitter/models"
)

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var userModel models.User

	err := json.NewDecoder(r.Body).Decode(&userModel)

	if err != nil {
		http.Error(w, "Invalid user or password"+err.Error(), 400)
		return
	}

	if len(userModel.Email) == 0 {
		http.Error(w, "Email is required", 400)
		return
	}

	user, exist := bd.TryLogin(userModel.Email, userModel.Password)
	if exist == false {
		http.Error(w, "Invalid user or password", 400)
		return
	}

	jwt, err := jwt.GenerateJWT(user)
	if err != nil {
		http.Error(w, "Error generating JWT"+err.Error(), 400)
		return
	}

	response := models.ResponseLogin{
		Token: jwt,
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)

	expirationTime := time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   jwt,
		Expires: expirationTime,
	})
}
