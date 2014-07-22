package util

import (
	"appengine"
	"crypto/rand"
	"encoding/base32"
	"encoding/json"
	"fmt"
	"net/http"
)

type ErrorHandler func(w http.ResponseWriter, r *http.Request, c appengine.Context) error

func (h ErrorHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	c := appengine.NewContext(r)

	err := h(w, r, c)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func WriteJsonReponse(w http.ResponseWriter, obj interface{}) error {
	js, err := json.Marshal(obj)
	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
	return nil
}

func RandAlphaNumeric(size int) string {
	b := make([]byte, size)
	rand.Read(b)
	en := base32.StdEncoding
	d := make([]byte, en.EncodedLen(len(b)))
	en.Encode(d, b)
	return fmt.Sprintf("%s", d[0:5])
}
