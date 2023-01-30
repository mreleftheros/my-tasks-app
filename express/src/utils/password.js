const { scrypt, randomBytes, timingSafeEqual } = require("crypto");

exports.getHashedPassword = async password => {
  const salt = randomBytes(16).toString("hex");
  return await new Promise((res, rej) => {
    return scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) rej(new Error(err));
      res(`${derivedKey.toString("hex")}.${salt}`);
    });
  });
};

exports.comparePassword = async (stored, provided) => {
  const [hash, salt] = stored.split(".");
  const hashBuf = Buffer.from(hash, "hex");
  return await new Promise((res, rej) => {
    return scrypt(provided, salt, 64, (err, key) => {
      if (err) rej(new Error(err));
      res(timingSafeEqual(hashBuf, key));
    });
  });
};
