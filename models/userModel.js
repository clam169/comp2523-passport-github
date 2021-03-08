const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    isAdmin: true,
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (profile) => {
    let profileId = parseInt(profile.id)
    let profileName;
    if (profile.displayName) {
      profileName = profile.displayName;
    } else {
      profileName = profile.username;
    }
    const user = database.find((user) => user.id === profileId);
    if (user) {
      return user;
    } else {
      database.push({
        id: profileId,
        name: profileName,
      })
      userModel.findById(profileId);
    }
  },
  // isAdmin: (user) => {
  //  return user.isAdmin;
  // }
};

module.exports = { database, userModel };
