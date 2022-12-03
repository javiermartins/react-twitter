package routers

import (
	"errors"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
)

var Email string

var IdUser string

func ProcessToken(token string) (*models.Claim, bool, string, error) {
	key := []byte(constants.TOKENKEY)
	claims := &models.Claim{}

	splitToken := strings.Split(token, "Bearer")
	if len(splitToken) != 2 {
		return claims, false, string(""), errors.New("Invalid token format")
	}

	token = strings.TrimSpace(splitToken[1])

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return key, nil
	})
	if err == nil {
		_, found, ID := bd.CheckUserExist(claims.Email)
		if found == true {
			Email = claims.Email
			IdUser = ID
		}
		return claims, found, IdUser, nil
	}
	if !tkn.Valid {
		return claims, false, string(""), errors.New("Invalid token")
	}

	return claims, false, string(""), err
}
