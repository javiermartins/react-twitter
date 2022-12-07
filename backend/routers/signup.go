package routers

import (
	"encoding/json"
	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
	"net/http"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error in data received"+err.Error(), 400)
		return
	}

	if len(user.Email) == 0 {
		http.Error(w, "Email is required", 400)
		return
	}
	if len(user.Password) < 6 {
		http.Error(w, "The password must be longer than 6 characters", 400)
		return
	}

	_, found, _ := bd.CheckUserExist(user.Email)
	if found == true {
		http.Error(w, "The email address is already registered", 400)
		return
	}

	_, status, err := bd.InsertRecord(user)
	if err != nil {
		http.Error(w, "Error creating the user"+err.Error(), 400)
		return
	}
	if status == false {
		http.Error(w, "Error creating the user", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
