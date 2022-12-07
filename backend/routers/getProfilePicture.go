package routers

import (
	"io"
	"net/http"
	"os"

	"github.com/javiermartins/react-twitter/bd"
)

func GetProfilePicture(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("idUser")
	if len(ID) < 1 {
		http.Error(w, "The idUser is missing", http.StatusBadRequest)
		return
	}

	profile, err := bd.SearchProfile(ID)
	if err != nil {
		http.Error(w, "User not found", http.StatusBadRequest)
		return
	}

	openFile, err := os.Open("uploads/profilePictures/" + profile.ProfilePicture)
	if err != nil {
		http.Error(w, "Image not found", http.StatusBadRequest)
		return
	}

	_, err = io.Copy(w, openFile)
	if err != nil {
		http.Error(w, "Error copying the image"+err.Error(), http.StatusBadRequest)
		return
	}
}
