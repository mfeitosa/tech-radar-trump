package user

import (
  "appengine"
  "appengine/datastore"
  "math/rand"
  "util"
)

type StrictUser struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Email string `json:"email"`
  Company string `json:"company"`
  Job string `json:"job"`
}

type User struct {
  StrictUser
  Pin int `json:"pin"`
}

func (u *User) GenerateIdAndPin() {
  u.Id = util.RandAlphaNumeric(5)
  u.Pin = rand.Intn(10000)
}

func (u *User) Save(c appengine.Context) (*datastore.Key, error) {
  key := datastore.NewIncompleteKey(c, "User", nil)
  return datastore.Put(c, key, u)
}

func GetByKey(c appengine.Context, key *datastore.Key) (*User, error) {
  user := &User{}
  err := datastore.Get(c, key, user)
  return user, err
}

func GetById(c appengine.Context, id string) (*User, error) {
  q := datastore.NewQuery("User").Filter("Id =", id).Limit(1)

  users := []User{}
  if _, err := q.GetAll(c, &users); err != nil {
    return nil, err
  }
  if len(users) > 0 {
    return &users[0], nil
  }
  return nil, nil
}

func GetAll(c appengine.Context) ([]User, error) {
  q := datastore.NewQuery("User")

  users := []User{}
  _, err := q.GetAll(c, &users)
  return users, err
}
