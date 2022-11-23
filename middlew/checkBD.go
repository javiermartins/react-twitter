package middlew

import (
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
)

func CheckBD(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if bd.CheckConnection() == 0 {
			http.Error(w, "Internal serve error", 500)
			return
		}
		next.ServeHTTP(w, r)
	}
}
