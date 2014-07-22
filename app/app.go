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
  "battle"
)

var store = sessions.NewCookieStore([]byte("oioioi"))
var AdminNotLoggedErr = errors.New("Admin is not logged")

func init() {
    r := mux.NewRouter()
    r.Handle("/admin", util.ErrorHandler(handleAdminLogin)).Methods("POST")

    r.Handle("/users", util.ErrorHandler(handleUserList)).Methods("GET")
    r.Handle("/users", util.ErrorHandler(handleUserAdd)).Methods("POST")
    r.Handle("/users/id={id:[a-zA-Z0-9]+}", util.ErrorHandler(handleUserGet)).Methods("GET")

    r.Handle("/battles", util.ErrorHandler(handleBattleResults)).Methods("GET")
    r.Handle("/battles", util.ErrorHandler(handleBattleAdd)).Methods("POST")

    http.Handle("/", r)
}

func handleUserList(w http.ResponseWriter, r *http.Request, c appengine.Context) error {

  if err := checkLogin(w, r, c); err != nil {
    return err
  }

  users, err := user.GetAll(c)
  if err != nil {
    return err
  }

  return util.WriteJsonReponse(w, users)
}

func handleUserAdd(w http.ResponseWriter, r *http.Request, c appengine.Context) error {

  if err := checkLogin(w, r, c); err != nil {
    return err
  }

  decoder := json.NewDecoder(r.Body)
  u := &user.User{}
  if err := decoder.Decode(u); err != nil {
    return err
  }

  u.GenerateIdAndPin()

  _, err := u.Save(c)
  if err != nil {
    return err
  }

  return util.WriteJsonReponse(w, u)
}

func handleUserGet(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  vars := mux.Vars(r)
  id := vars["id"]

  user, err := user.GetById(c, id)
  if err != nil {
    return err
  }

  if err := checkLogin(w, r, c); err != nil {
    if err.Error() != AdminNotLoggedErr.Error() {
      return err
    }
    return util.WriteJsonReponse(w, user.StrictUser)
  }
  return util.WriteJsonReponse(w, user)
}

func handleBattleAdd(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  decoder := json.NewDecoder(r.Body)
  b := &battle.Battle{}
  if err := decoder.Decode(b); err != nil {
    return err
  }

  _, err := b.Save(c)
  if err != nil {
    return err
  }

  result, err := battle.NewBattleResult(c, b.WinnerId, b.LoserId)

  return util.WriteJsonReponse(w, result)
}

func handleBattleResults(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  results, err := battle.CalcResults(c)
  if err != nil {
    return err
  }
  return util.WriteJsonReponse(w, results)
}

func handleAdminLogin(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  decoder := json.NewDecoder(r.Body)
  var json map[string]interface{}
  if err := decoder.Decode(&json); err != nil {
    return err
  }

  if json["pin"] != "PIN" {
    return errors.New("Admin PIN is wrong.")
  }

  return registerLogin(w, r, c)
}

func checkLogin(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  session, err := store.Get(r, "admin")
  if err != nil {
    return err
  }
  if _, ok := session.Values["admin"]; !ok {
    w.WriteHeader(http.StatusForbidden)
    return AdminNotLoggedErr
  }
  return nil
}

func registerLogin(w http.ResponseWriter, r *http.Request, c appengine.Context) error {
  session, err := store.Get(r, "admin")
  if err != nil {
    return err
  }
  session.Values["admin"] = true
  return session.Save(r, w)
}
