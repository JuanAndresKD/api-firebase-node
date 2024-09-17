const { encryptPassword, comparePassword, generateToken } = require("./authControllers");
const database = require("../db-firebase");

exports.signUpUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userRef = database.ref("users");
    const snapshot = await userRef.orderByChild("email").equalTo(email).once("value");

    if (snapshot.exists()) {
      return res.status(404).send("El correo ya existe");
    }

    const userRecord = await admin.auth().createUser({
      username,
      email,
      password,
    });

    // Guardar datos adicionales en Realtime Database
    const db = admin.database();
    await db.ref('users/' + userRecord.uid).set({
      username,
      email,
      password: await encryptPassword(password),
    });

    const token = generateToken(userId);

    res.json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signInUsers = async (req, res) => {
  try {
    const userRef = database.ref("users");
    const snapshot = await userRef.orderByChild("email").equalTo(req.body.email).once("value");

    if (!snapshot.exists()) {
      return res.status(404).send("El correo no existe");
    }

    const user = snapshot.val()[Object.keys(snapshot.val())[0]];
    const validPassword = await comparePassword(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = generateToken(user.id);

    res.status(200).json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

exports.listUsers = async (req, res) => {
  try {
    const userRef = database.ref("users");
    const snapshot = await userRef.once("value");
    const users = snapshot.val();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = database.ref(`users/${id}`);
    const snapshot = await userRef.once("value");
    const user = snapshot.val();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const userRef = database.ref(`users/${id}`);

    await userRef.update({ name, age, email });

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
