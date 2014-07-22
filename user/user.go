package user

import (
	"appengine"
	"appengine/datastore"
	"math/rand"
	"util"
)

type StrictUser struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Points int    `json:"points"`
}

type User struct {
	StrictUser
	Email   string `json:"email"`
	Company string `json:"company"`
	Job     string `json:"job"`
	Pin     int    `json:"pin"`
}

func (u *User) GenerateIdAndPin() {
	u.Id = util.RandAlphaNumeric(5)
	u.Pin = rand.Intn(10000)
}

func NewKey(ctx appengine.Context) *datastore.Key {
	return datastore.NewIncompleteKey(ctx, "User", nil)
}

func (u *User) Save(c appengine.Context, key *datastore.Key) (*datastore.Key, error) {
	return datastore.Put(c, key, u)
}

func ByKey(c appengine.Context, key *datastore.Key) (*User, error) {
	user := &User{}
	err := datastore.Get(c, key, user)
	return user, err
}

func ById(c appengine.Context, id string) (*datastore.Key, *User, error) {
	q := datastore.NewQuery("User").Filter("Id =", id).Limit(1)

	users := []User{}
	keys, err := q.GetAll(c, &users)
	if err != nil {
		return nil, nil, err
	}
	if len(users) > 0 {
		return keys[0], &users[0], nil
	}
	return nil, nil, nil
}

func GetAll(c appengine.Context) ([]User, error) {
	q := datastore.NewQuery("User").Order("-Points")

	users := []User{}
	_, err := q.GetAll(c, &users)
	return users, err
}

func Placing(c appengine.Context, points int) (int, error) {
	q := datastore.NewQuery("User").Filter("Points >", points)
	p, err := q.Count(c)
	return p + 1, err
}

func Strict(usrs []User) []StrictUser {
	stricts := make([]StrictUser, len(usrs))
	for i, u := range usrs {
		stricts[i] = u.StrictUser
	}
	return stricts
}
