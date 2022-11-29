package jwt

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
)

func GenerateJWT(user models.User) (string, error) {
	key := []byte(constants.TOKENKEY)

	payload := jwt.MapClaims{
		"email":     user.Email,
		"name":      user.Name,
		"surnames":  user.Surnames,
		"birthDate": user.BirthDate,
		"biography": user.Biography,
		"location":  user.Location,
		"webSite":   user.WebSite,
		"id":        user.ID.Hex(),
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString(key)

	if err != nil {
		return tokenStr, err
	}
	return tokenStr, nil
}
