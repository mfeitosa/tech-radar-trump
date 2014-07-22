package user

import (
  "testing"
  "appengine/aetest"
)

func TestSaveUser(t *testing.T) {
  c, err := aetest.NewContext(nil)
  if err != nil {
    t.Fatal(err)
  }
  defer c.Close()

  newUser := &User{
    Code: "123ABC",
    Name: "test",
    Pin: "1234",
    Points: 1,
  }

  _, err = newUser.Save(c)
  if err != nil {
    t.Fatal(err)
  }
}

func TestGetUser(t *testing.T) {
  c, err := aetest.NewContext(nil)
  if err != nil {
    t.Fatal(err)
  }
  defer c.Close()

  newUser := &User{
    Code: "123ABC",
    Name: "test",
    Pin: "1234",
    Points: 1,
  }

  key, err := newUser.Save(c)
  if err != nil {
    t.Fatal(err)
  }

  user, err := user.GetByKey(c, key)
  if err != nil {
    t.Fatal(err)
  }

  if newUser.Code != user.Code {
    t.Errorf("User %v, want %v", user, newUser)
  }
}
