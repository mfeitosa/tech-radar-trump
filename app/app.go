package main

import (
  "appengine"
  "net/http"
  "encoding/json"
  "github.com/gorilla/mux"
  "github.com/gorilla/sessions"
  "user"
  "util"
  "errors"
)

const ADMIN_PIN = "D1SRUPT1V3"
var store = sessions.NewCookieStore([]byte("YLL7CX2ZYMLL3ZH"))
var AdminNotLoggedErr = errors.New("Admin is not logged")

func init() {
    r := mux.NewRouter()
    r.Handle("/api/admin", util.ErrorHandler(handleAdminLogin)).Methods("POST")

    r.Handle("/api/users", util.ErrorHandler(handleUserList)).Methods("GET")
    r.Handle("/api/users", util.ErrorHandler(handleUserAdd)).Methods("POST")
    r.Handle("/api/users/{id:[a-zA-Z0-9]+}", util.ErrorHandler(handleUserGet)).Methods("GET")

    r.Handle("/api/users/points/{id:[a-zA-Z0-9]+}", util.ErrorHandler(handleUserPointsGet)).Methods("GET")
    r.Handle("/api/users/points", util.ErrorHandler(handleUserPointsAdd)).Methods("POST")

    http.Handle("/", r)
}

func handleUserList(w http.ResponseWriter, r *http.Request, c appengine.Context) error {

  usrs, err := user.GetAll(c)
  if err != nil {
    return err
  }

  if checkAdmin(w, r, c) {
    return util.WriteJsonReponse(w, usrs)
  }
  return util.WriteJsonReponse(w, user.Strict(usrs))
}

func handleUserAdd(w http.ResponseWriter, r *http.Request, c appengine.Context) error {

  if !checkAdmin(w, r, c) {
    return AdminNotLoggedErr
  }

  decoder := json.NewDecoder(r.Body)
  u := &user.User{}
  if err := decoder.Decode(u); err != nil {
    return err
  }

  u.GenerateIdAndPin()

  _, err := u.Save(c, user.NewKey(c))
  if err != nil {
    return err
  }

  return util.WriteJsonReponse(w, u)
}

func handleUserPointsGet(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  vars := mux.Vars(r)
  id := vars["id"]

  _, u, err := user.ById(c, id)
  if err != nil {
    return err
  }

  placing, err := user.Placing(c, u.Points)
  if err != nil {
    return err
  }

  resp := map[string]interface{}{
    "placing": placing,
  }

  return util.WriteJsonReponse(w, resp)
}

func handleUserGet(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  vars := mux.Vars(r)
  id := vars["id"]

  _, user, err := user.ById(c, id)
  if err != nil {
    return err
  }

  if checkAdmin(w, r, c) {
    return util.WriteJsonReponse(w, user)
  }
  return util.WriteJsonReponse(w, user.StrictUser)
}

func handleUserPointsAdd(w http.ResponseWriter, r *http.Request, c appengine.Context) error {

  if !checkAdmin(w, r, c) {
    return AdminNotLoggedErr
  }

  decoder := json.NewDecoder(r.Body)
  userInfo := &user.User{}
  if err := decoder.Decode(userInfo); err != nil {
    return err
  }

  k, u, err := user.ById(c, userInfo.Id)
  if err != nil {
    return err
  }
  if u == nil {
    return errors.New("there`s no user with this userId")
  }
  u.Points = userInfo.Points
  if _, err := u.Save(c, k); err != nil {
    return err
  }
  return nil
}

//admin

func handleAdminLogin(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  decoder := json.NewDecoder(r.Body)
  var json map[string]interface{}
  if err := decoder.Decode(&json); err != nil {
    return err
  }

  if json["pin"] != ADMIN_PIN {
    return errors.New("Admin PIN is wrong.")
  }

  return registerAdmin(w, r, c)
}

func checkAdmin(w http.ResponseWriter, r *http.Request, c appengine.Context) bool {
  session, err := store.Get(r, "admin")
  if err != nil {
    c.Debugf("%s", err)
    return false
  }
  _, ok := session.Values["admin"]
  return ok
}

func registerAdmin(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  session, err := store.Get(r, "admin")
  if err != nil {
    return err
  }
  session.Values["admin"] = true
  return session.Save(r, w)
}
