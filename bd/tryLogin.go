package bd

import (
	"github.com/javiermartins/react-twitter/models"
	"golang.org/x/crypto/bcrypt"
)

func TryLogin(email string, password string) (models.User, bool) {
	user, found, _ := CheckUserExist(email)

	if found == false {
		return user, false
	}

	passwordBD := []byte(user.Password)
	passwordBytes := []byte(password)

	err := bcrypt.CompareHashAndPassword(passwordBD, passwordBytes)
	if err != nil {
		return user, false
	}
	return user, true
}
