package battle

import (
  "appengine"
  "appengine/datastore"
  "sort"
  "strconv"
  "user"
)

type Battle struct {
  WinnerId string `json:"winnerId"`
  LoserId string `json:"loserId"`
}

type UserResult struct {
  Id string `json:"id"`
  Placing string `json:"placing"`
}

type BattleResult struct {
  Winner UserResult `json:"winner"`
  Loser UserResult `json:"loser"`
}

type BattlesResult struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Wins int `json:"wins"`
  Loss int `json:"loss"`
  Total int `json:"total"`
}

type BattlesResults []*BattlesResult

func (b *Battle) Save(c appengine.Context) (*datastore.Key, error) {
  key := datastore.NewIncompleteKey(c, "Battle", nil)
  return datastore.Put(c, key, b)
}

func GetAll(c appengine.Context) ([]Battle, error) {
  q := datastore.NewQuery("Battle")

  battles := []Battle{}
  _, err := q.GetAll(c, &battles)
  return battles, err
}

func (b BattlesResults) Len() int {
  return len(b)
}

func (b BattlesResults) Swap(i, j int) {
  b[i], b[j] = b[j], b[i]
}

func (b BattlesResults) Less(i, j int) bool {
  return b[i].Wins > b[j].Wins
}

func GetWins(c appengine.Context, userId string) (int, error) {
  q := datastore.NewQuery("Battle").Filter("WinnerId =", userId)
  return q.Count(c)
}

func GetLoss(c appengine.Context, userId string) (int, error) {
  q := datastore.NewQuery("Battle").Filter("LoserId =", userId)
  return q.Count(c)
}

func CalcWins(c appengine.Context, usrs []user.User) (map[string]int, error) {

  usersWins := make(map[string]int)
  for _, u := range usrs {
    wins, err := GetWins(c, u.Id)
    if err != nil {
      return nil, err
    }
    usersWins[u.Id] = wins
  }
  return usersWins, nil
}

func CalcLoss(c appengine.Context, usrs []user.User) (map[string]int, error) {

  usersLoss := make(map[string]int)
  for _, u := range usrs {
    wins, err := GetLoss(c, u.Id)
    if err != nil {
      return nil, err
    }
    usersLoss[u.Id] = wins
  }
  return usersLoss, nil
}

func CalcPlacing(c appengine.Context, usrs []user.User, usrsWins map[string]int, userId string) (string, error) {
  results, err := mountResults(c, usrs, usrsWins, make(map[string]int))
  if err != nil {
    return "", err
  }
  for i, r := range results {
    if r.Id == userId {
      return strconv.Itoa(i+1), nil
    }
  }
  return "", nil
}

func mountResults(c appengine.Context, usrs []user.User, usrsWins map[string]int, usrsLoss map[string]int) (BattlesResults, error) {

  results := make(BattlesResults, len(usrs))
  for i, u := range usrs {
    wins := usrsWins[u.Id]
    loss := usrsLoss[u.Id]
    results[i] = &BattlesResult{
      Name: u.Name,
      Id: u.Id,
      Wins: wins,
      Loss: loss,
      Total: wins + loss,
    }
  }
  sort.Sort(results)
  return results, nil
}

func CalcResults(c appengine.Context) (BattlesResults, error) {
  usrs, err := user.GetAll(c)
  if err != nil {
    return nil, err
  }

  usrsWins, err := CalcWins(c, usrs)
  if err != nil {
    return nil, err
  }

  usrsLoss, err := CalcLoss(c, usrs)
  if err != nil {
    return nil, err
  }

  return mountResults(c, usrs, usrsWins, usrsLoss)
}


func NewBattleResult(c appengine.Context, winnerId string, loserId string) (*BattleResult, error) {
  usrs, err := user.GetAll(c)
  if err != nil {
    return nil, err
  }

  usrsWins, err := CalcWins(c, usrs)
  if err != nil {
    return nil, err
  }

  winnerPlacing, err := CalcPlacing(c, usrs, usrsWins, winnerId)
  if err != nil {
    return nil, err
  }

  loserPlacing, err := CalcPlacing(c, usrs, usrsWins, loserId)
  if err != nil {
    return nil, err
  }

  result := &BattleResult{
    Winner: UserResult {
      Id: winnerId,
      Placing: winnerPlacing,
    },
    Loser: UserResult {
      Id: loserId,
      Placing: loserPlacing,
    },
  }
  return result, nil
}
