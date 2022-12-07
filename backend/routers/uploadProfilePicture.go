package routers

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
)

func UploadProfilePicture(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("picture")
	var extension = strings.Split(handler.Filename, ".")[1]
	var filePath string = "uploads/profilePictures/" + IdUser + "." + extension

	filePermission, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, "Error uploading image"+err.Error(), http.StatusBadRequest)
		return
	}

	_, err = io.Copy(filePermission, file)

	if err != nil {
		http.Error(w, "Error copying the image"+err.Error(), http.StatusBadRequest)
		return
	}

	var user models.User
	var status bool

	user.ProfilePicture = IdUser + "." + extension
	status, err = bd.ModifyRecord(user, IdUser)
	if err != nil || status == false {
		http.Error(w, "Error saving image"+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
